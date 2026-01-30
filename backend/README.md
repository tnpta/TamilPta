# Tamil Nadu PTA School Registration - Backend API

Node.js + Express + SQLite backend for the school registration system.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Initialize the database:
```bash
npm run init-db
```

This will create the SQLite database at `backend/data/school_reg.db` with all required tables.

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- **POST** `/api/auth/continue`
  - Body: `{ "mobile": "9876543210" }`
  - Returns: `{ "ok": true, "isExisting": boolean, "mobile": string }`

### School Data
- **GET** `/api/schools/:mobile/full`
  - Returns all school data grouped by tabs (basic, trust, staff, infrastructure, fees)

- **PUT** `/api/schools/:mobile/draft`
  - Body: Complete form data object
  - Saves as draft (partial data allowed)

- **PUT** `/api/schools/:mobile/submit`
  - Body: Complete form data object
  - Final submission (validates required fields)

## Database

The database uses SQLite with the following key tables:
- `schools` - Basic school information (primary key: `school_mobile_no`)
- `trust_management_details` - Trust and management info
- `staff_summary` - Teaching staff summary
- `non_teaching_staff_summary` - Non-teaching staff
- `class_wise_student_strength` - Student strength by class
- `school_infrastructure` - Infrastructure details
- `school_building_blocks` - Building block details
- `school_certificates` - Required certificates
- `fees_fixation_details` - Fees information
- `class_level_expenses` - Expense details
- `school_vehicles` - Vehicle information
- `school_other_compliance_details` - Compliance details

All tables are linked via `school_mobile_no` as the primary/foreign key.

## Data Flow

1. User enters mobile number → `/api/auth/continue` checks if school exists
2. If existing → Fetch all data via `/api/schools/:mobile/full`
3. User edits and can save draft via `/api/schools/:mobile/draft`
4. Final submission via `/api/schools/:mobile/submit`

All save operations use SQLite transactions to ensure data consistency.
