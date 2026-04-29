# Deployment Guide

Guide for deploying SecurePass Guard to production.

## Prerequisites

- Node.js v16+ installed on server
- MongoDB database (Atlas recommended)
- Domain name (optional)
- SSL certificate (Let's Encrypt recommended)

## Environment Setup

### Backend Environment Variables

Create `backend/.env` for production:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/securepass?retryWrites=true&w=majority
JWT_SECRET=<generate-secure-64-char-secret>
ENCRYPTION_KEY=<generate-secure-32-char-key>
NODE_ENV=production
```

**Generate secure keys:**
```bash
# JWT Secret (64 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Clone and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/securepass-guard.git
cd securepass-guard

# Setup backend
cd backend
npm install --production
cp .env.example .env
# Edit .env with production values

# Setup frontend
cd ../frontend
npm install
npm run build
```

#### 3. Start Backend with PM2

```bash
cd backend
pm2 start server.js --name securepass-backend
pm2 save
pm2 startup
```

#### 4. Configure Nginx

Create `/etc/nginx/sites-available/securepass`:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /path/to/securepass-guard/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/securepass /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Setup SSL with Let's Encrypt

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

### Option 2: Heroku

#### Backend Deployment

1. **Create Heroku app:**
```bash
heroku create securepass-api
```

2. **Add MongoDB:**
```bash
heroku addons:create mongolab:sandbox
```

3. **Set environment variables:**
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set ENCRYPTION_KEY=your-key
heroku config:set NODE_ENV=production
```

4. **Create Procfile:**
```
web: node server.js
```

5. **Deploy:**
```bash
git subtree push --prefix backend heroku main
```

#### Frontend Deployment (Netlify/Vercel)

**Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
cd frontend
vercel --prod
```

### Option 3: Docker

#### Create Dockerfiles

**backend/Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**frontend/Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**Deploy:**
```bash
docker-compose up -d
```

### Option 4: Cloud Platforms

#### AWS (Elastic Beanstalk)

1. Install EB CLI
2. Initialize: `eb init`
3. Create environment: `eb create production`
4. Deploy: `eb deploy`

#### Google Cloud Platform (App Engine)

1. Create `app.yaml`
2. Deploy: `gcloud app deploy`

#### Azure (App Service)

1. Create App Service
2. Deploy via GitHub Actions or Azure CLI

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (or allow all: 0.0.0.0/0)
5. Get connection string
6. Update MONGODB_URI in .env

### Self-Hosted MongoDB

```bash
# Install MongoDB
sudo apt install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Secure MongoDB
mongo
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["root"]
})
```

## Security Checklist

- [ ] Use HTTPS (SSL/TLS)
- [ ] Set secure environment variables
- [ ] Enable MongoDB authentication
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS for specific origins
- [ ] Use strong JWT secrets
- [ ] Implement request logging
- [ ] Set up monitoring
- [ ] Regular security updates
- [ ] Database backups
- [ ] Error logging (Sentry, LogRocket)

## Performance Optimization

### Backend

1. **Enable compression:**
```javascript
import compression from 'compression';
app.use(compression());
```

2. **Add caching:**
```javascript
import redis from 'redis';
// Implement Redis caching
```

3. **Database indexing:**
```javascript
vaultSchema.index({ userId: 1 });
userSchema.index({ email: 1 });
```

### Frontend

1. **Code splitting:**
```javascript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

2. **Image optimization:**
- Use WebP format
- Lazy load images
- Compress images

3. **CDN for static assets:**
- Use Cloudflare or AWS CloudFront

## Monitoring

### Application Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs
```

**Log Management:**
- Use Winston for structured logging
- Send logs to ELK stack or Papertrail

### Uptime Monitoring

- UptimeRobot
- Pingdom
- StatusCake

### Error Tracking

- Sentry
- Rollbar
- Bugsnag

## Backup Strategy

### Database Backups

**MongoDB Atlas:**
- Automatic backups enabled by default
- Configure backup schedule

**Self-Hosted:**
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/securepass" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/securepass" /backup/20240101
```

### Code Backups

- Use Git for version control
- Regular commits to GitHub/GitLab
- Tag releases

## Scaling

### Horizontal Scaling

1. **Load Balancer:**
- Nginx
- AWS ELB
- Cloudflare

2. **Multiple Backend Instances:**
```bash
pm2 start server.js -i max
```

3. **Database Replication:**
- MongoDB replica sets
- Read replicas

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database queries
- Use caching

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
      
      - name: Build frontend
        run: cd frontend && npm run build
      
      - name: Deploy to server
        run: |
          # Add deployment commands
```

## Post-Deployment

1. **Test all features:**
   - User registration/login
   - Password checking
   - Vault operations
   - Dark mode
   - Mobile responsiveness

2. **Monitor logs:**
```bash
pm2 logs securepass-backend
tail -f /var/log/nginx/access.log
```

3. **Set up alerts:**
   - Server down alerts
   - Error rate alerts
   - Performance alerts

4. **Documentation:**
   - Update API documentation
   - Document deployment process
   - Create runbook for common issues

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review security advisories
- Monitor disk space
- Check error logs
- Review performance metrics
- Test backups
- Rotate secrets annually

### Updates

```bash
# Update backend
cd backend
npm update
npm audit fix

# Update frontend
cd frontend
npm update
npm audit fix

# Restart services
pm2 restart all
```

## Rollback Plan

1. **Keep previous version:**
```bash
git tag v1.0.0
git push --tags
```

2. **Quick rollback:**
```bash
git checkout v1.0.0
pm2 restart all
```

3. **Database rollback:**
- Restore from backup
- Run migration scripts

## Support

For deployment issues:
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Review server logs
- Check application logs
- Verify environment variables
- Test database connection

---

**Production Checklist:**
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Database secured
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Error tracking setup
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Documentation updated
- [ ] Team trained
