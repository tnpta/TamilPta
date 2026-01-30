# Tamil Nadu PTA School Registration - Setup Guide

Complete setup instructions for installing and running this project on a new machine.

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: macOS, Linux, or Windows
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Disk Space**: ~500 MB for dependencies
- **RAM**: 2 GB minimum (4 GB recommended)

### Recommended
- **Node.js**: v20.x LTS or v22.x
- **npm**: v10.x or higher
- **Code Editor**: VS Code or Cursor

---

## 🔧 Prerequisites Installation

### 1. Install Node.js and npm

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
- Download and install from https://nodejs.org/
- Choose the LTS version
- Make sure to check "Add to PATH" during installation

**Verify Installation:**
```bash
node --version    # Should show v18+ or v20+
npm --version     # Should show v9+ or v10+
```

---

## 📦 Project Setup Steps

### Step 1: Clone or Copy Project Files

**Option A: If using Git:**
```bash
git clone <repository-url>
cd tamilnaduSchoolReg
```

**Option B: If copying files:**
- Copy the entire project folder to the new machine
- Navigate to the project directory:
```bash
cd /path/to/tamilnaduSchoolReg
```

### Step 2: Install Frontend Dependencies

```bash
# From project root directory
npm install
```

**This installs:**
- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.12.0
- Vite 6.2.0
- TypeScript 5.8.2
- Lucide React (Icons)
- better-sqlite3 12.6.2
- Tailwind CSS (via configuration)

**Expected Output:**
```
added 110 packages, and audited 111 packages
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

**This installs:**
- Express 4.18.2
- CORS 2.8.5
- Multer 2.0.2 (for file uploads)
- SQLite3 5.1.7
- dotenv 16.3.1
- better-sqlite3 (if needed)

**Expected Output:**
```
added 50+ packages, and audited 50+ packages
```

### Step 4: Initialize Database

```bash
# Still in backend directory
npm run init-db
```

**This will:**
- Create `backend/data/` directory if it doesn't exist
- Create SQLite database at `backend/data/school_reg.db`
- Create all required tables with proper schema
- Set up foreign keys and indexes

**Expected Output:**
```
✅ Database initialized successfully!
📁 Database location: /path/to/backend/data/school_reg.db
```

### Step 5: Configure Environment Variables (Optional)

**Create `.env` file in project root:**
```bash
# From project root
cp .env.example .env
```

**Edit `.env` file:**
```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:5001/api

# Backend Environment Variables
PORT=5001
```

**Note:** The project works with default values, but you can customize ports if needed.

---

## 🚀 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Database connected: /path/to/backend/data/school_reg.db
🚀 Server running on http://localhost:5001
📊 API endpoints:
   POST /api/auth/continue
   GET  /api/schools/:mobile/full
   PUT  /api/schools/:mobile/draft
   PUT  /api/schools/:mobile/submit
   POST /api/uploads/:mobile/document
   POST /api/uploads/:mobile/documents
   GET  /api/uploads/:mobile/documents
   DELETE /api/uploads/:mobile/document/:filename
```

### Terminal 2: Start Frontend Server

```bash
# From project root directory
npm run dev
```

**Expected Output:**
```
  VITE v6.2.0  ready in 500 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

---

## 📚 Complete Dependency List

### Frontend Dependencies (`package.json`)

**Production:**
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `react-router-dom`: ^7.12.0
- `lucide-react`: ^0.555.0 (Icons)
- `better-sqlite3`: ^12.6.2

**Development:**
- `vite`: ^6.2.0
- `@vitejs/plugin-react`: ^5.0.0
- `typescript`: ~5.8.2
- `@types/node`: ^22.14.0

### Backend Dependencies (`backend/package.json`)

**Production:**
- `express`: ^4.18.2
- `cors`: ^2.8.5
- `multer`: ^2.0.2
- `sqlite3`: ^5.1.7
- `dotenv`: ^16.3.1

**Development:**
- `@types/express`: ^4.17.21

---

## 🗂️ Project Structure

```
tamilnaduSchoolReg/
├── backend/
│   ├── db/
│   │   └── database.js              # Database connection
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── schools.js               # School data routes
│   │   └── uploads.js               # File upload routes
│   ├── services/
│   │   └── schoolService.js         # Business logic
│   ├── scripts/
│   │   ├── init-db.js               # Database initialization
│   │   ├── checkpoint-db.js         # WAL checkpoint utility
│   │   ├── add-pta-consultation-column.js
│   │   └── add-compliance-details-columns.js
│   ├── data/
│   │   └── school_reg.db            # SQLite database (created after init)
│   └── server.js                    # Express server
├── components/
│   ├── registration/                # Form components
│   │   ├── BasicInfoForm.tsx
│   │   ├── TrustManagementForm.tsx
│   │   ├── StaffStudentsForm.tsx
│   │   ├── InfrastructureForm.tsx
│   │   └── FeesOtherForm.tsx
│   └── ...                          # Other components
├── pages/
│   └── RegisterSchool.tsx            # Main registration page
├── utils/
│   ├── api.ts                       # API client functions
│   └── dataMapper.ts                # Data mapping utilities
├── package.json                     # Frontend dependencies
├── vite.config.ts                   # Vite configuration
└── .env.example                     # Environment variables template
```

---

## 🔍 Verification Steps

### 1. Check Node.js Installation
```bash
node --version
npm --version
```

### 2. Verify Dependencies Installed
```bash
# Frontend
ls node_modules | head -5

# Backend
ls backend/node_modules | head -5
```

### 3. Check Database Created
```bash
ls -la backend/data/school_reg.db
```

### 4. Test Backend Server
```bash
curl http://localhost:5001/health
# Should return: {"ok":true,"message":"Server is running"}
```

### 5. Test Frontend
- Open browser to http://localhost:3001
- Should see the application homepage

---

## 🛠️ Troubleshooting

### Issue: Permission Denied on Vite
```bash
chmod +x node_modules/.bin/*
```

### Issue: Missing @rollup/rollup-darwin-arm64
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database Connection Error
```bash
# Ensure data directory exists
mkdir -p backend/data

# Reinitialize database
cd backend
npm run init-db
```

### Issue: Port Already in Use
```bash
# Change port in backend/server.js or .env file
# Or kill the process using the port:
# macOS/Linux:
lsof -ti:5001 | xargs kill -9
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### Issue: Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Additional Configuration

### Database Path Configuration

The database path is configured in `backend/db/database.js`:
```javascript
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');
```

To change the database location, modify this file.

### API Port Configuration

**Backend Port:** Set in `backend/server.js` or `.env`:
```javascript
const PORT = process.env.PORT || 5001;
```

**Frontend Port:** Set in `vite.config.ts`:
```javascript
server: {
  port: 3001,
  // ...
}
```

### File Upload Configuration

Uploaded files are stored in:
```
backend/uploads/{mobile_number}/
```

Configure in `backend/routes/uploads.js` if needed.

---

## 🎯 Quick Start Commands Summary

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install

# 3. Initialize database
npm run init-db

# 4. Start backend (Terminal 1)
npm run dev

# 5. Start frontend (Terminal 2 - from project root)
cd .. && npm run dev
```

---

## ✅ Post-Installation Checklist

- [ ] Node.js v18+ installed
- [ ] npm installed
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Database initialized (`cd backend && npm run init-db`)
- [ ] Backend server starts successfully
- [ ] Frontend server starts successfully
- [ ] Application accessible at http://localhost:3001
- [ ] API health check works (http://localhost:5001/health)

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure ports 3001 and 5001 are available
4. Check console logs for specific error messages

---

## 🔄 Database Migration Scripts

If you need to add columns or modify existing databases, run:

```bash
cd backend

# Add PTA consultation column
node scripts/add-pta-consultation-column.js

# Add compliance details columns
node scripts/add-compliance-details-columns.js

# Change fees columns from REAL to TEXT (for text values)
node scripts/change-fees-columns-to-text.js
```

**Note:** Run migration scripts only if you have an existing database that needs updating. New databases created with `npm run init-db` will have the correct schema.

---

## 🗑️ Truncate All Tables Script

To clear all data from all tables:

```bash
cd backend
node scripts/truncate-all-tables.js
```

This will:
- Delete all data from all tables
- Run VACUUM to reclaim disk space
- Keep the table structure intact

**⚠️ Warning:** This permanently deletes all data. Use with caution!
