#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  1section-waitlist VPS Setup${NC}"
echo -e "${GREEN}========================================${NC}"

# --- Check prerequisites ---
if ! command -v node &> /dev/null; then
  echo -e "${RED}Node.js is not installed. Install it first via nvm:${NC}"
  echo -e "${YELLOW}  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash${NC}"
  echo -e "${YELLOW}  nvm install 22${NC}"
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo -e "${RED}npm is not available. Check your Node.js installation.${NC}"
  exit 1
fi

if ! command -v git &> /dev/null; then
  echo -e "${RED}git is not installed. Install it first:${NC}"
  echo -e "${YELLOW}  sudo apt-get install git${NC}"
  exit 1
fi

# --- PM2 ---
if ! command -v pm2 &> /dev/null; then
  echo -e "${YELLOW}Installing PM2...${NC}"
  npm install -g pm2
fi

# --- Clone / pull ---
PROJECT_DIR="/opt/1section-waitlist"

if [ ! -d "$PROJECT_DIR" ]; then
  echo -e "${YELLOW}Cloning repository...${NC}"
  sudo mkdir -p "$PROJECT_DIR"
  sudo chown -R $(whoami):$(whoami) "$PROJECT_DIR"
  git clone https://github.com/m-a-b-d-u-h/1section-waitlist.git "$PROJECT_DIR"
else
  echo -e "${YELLOW}Pulling latest changes...${NC}"
  cd "$PROJECT_DIR" && git pull
fi

cd "$PROJECT_DIR"

# --- Environment files ---
if [ ! -f server/.env ]; then
  echo -e "${YELLOW}Creating server/.env (you must edit this!)${NC}"
  cat > server/.env << 'ENVEOF'
PORT=4000
CLIENT_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3001"
ADMIN_USERNAME="mabduh"
ADMIN_PASSWORD="mabduh"
DATABASE_URL="postgres://user:pass@host:5432/db?sslmode=require"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
SMTP_HOST=""
SMTP_PORT="2525"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="waitlist@1section.com"
ENVEOF
  echo -e "${RED}⚠  EDIT server/.env with your real DATABASE_URL and secrets!${NC}"
fi

if [ ! -f client/.env.local ]; then
  cat > client/.env.local << 'ENVEOF'
NEXT_PUBLIC_API_URL="http://YOUR_SERVER_IP:4000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
ENVEOF
  echo -e "${YELLOW}  → Edit client/.env.local with your server IP and Google Client ID${NC}"
fi

if [ ! -f admin/.env ]; then
  cat > admin/.env << 'ENVEOF'
VITE_API_URL=""
ENVEOF
fi

# --- Install deps ---
echo -e "${YELLOW}Installing server dependencies...${NC}"
cd "$PROJECT_DIR/server" && npm install

echo -e "${YELLOW}Installing client dependencies...${NC}"
cd "$PROJECT_DIR/client" && npm install

echo -e "${YELLOW}Installing admin dependencies...${NC}"
cd "$PROJECT_DIR/admin" && npm install

# --- Prisma generate ---
echo -e "${YELLOW}Generating Prisma client...${NC}"
cd "$PROJECT_DIR/server" && npx prisma generate

# --- Build ---
echo -e "${YELLOW}Building server...${NC}"
cd "$PROJECT_DIR/server" && npm run build

echo -e "${YELLOW}Building client...${NC}"
cd "$PROJECT_DIR/client" && npm run build

echo -e "${YELLOW}Building admin...${NC}"
cd "$PROJECT_DIR/admin" && npm run build

# --- DB migrations ---
echo -e "${YELLOW}Applying database migrations...${NC}"
cd "$PROJECT_DIR/server" && npx prisma migrate deploy

# --- PM2 start ---
echo -e "${YELLOW}Starting PM2 processes...${NC}"

pm2 delete server 2>/dev/null || true
pm2 delete client 2>/dev/null || true

cd "$PROJECT_DIR/server"
pm2 start dist/server.js --name "server" --watch dist

cd "$PROJECT_DIR/client"
pm2 start "npx next start -p 3000" --name "client"

# --- Startup ---
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp /home/$(whoami)

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo -e "${GREEN}  Server  → http://localhost:4000${NC}"
echo -e "${GREEN}  Admin   → http://localhost:4000 (root)${NC}"
echo -e "${GREEN}  Client  → http://localhost:3000${NC}"
echo -e "${GREEN}  Logs    → pm2 logs${NC}"
echo -e "${GREEN}  Status  → pm2 status${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${RED}  ⚠  Don't forget to edit server/.env!${NC}"
