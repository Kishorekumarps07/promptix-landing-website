# PromptiX Backend API

Production-ready Express + MongoDB backend for PromptiX platform.

## Features

- ✅ Express.js REST API
- ✅ MongoDB Atlas integration with Mongoose
- ✅ CORS enabled for Vercel frontend
- ✅ Request logging with Morgan
- ✅ Input validation
- ✅ Duplicate submission prevention
- ✅ Comprehensive error handling
- ✅ Health check endpoint

## API Endpoints

### Health Check
```
GET /
```
Returns server status and MongoDB connection state.

### Contact Form
```
POST /api/contacts
```
**Required fields:**
- `fullName` (string, 2-100 chars)
- `email` (string, valid email)
- `phone` (string)
- `message` (string, 10-2000 chars)

**Optional fields:**
- `subject` (string, max 200 chars)
- `source` (string, default: "Contact Page")

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us!",
  "data": {
    "id": "...",
    "fullName": "...",
    "email": "...",
    "createdAt": "..."
  }
}
```

### Career Applications
```
POST /api/careers
```
**Required fields:**
- `fullName` (string)
- `email` (string, valid email)
- `phone` (string)
- `roleApplied` (string)

**Optional fields:**
- `city`, `linkedIn`, `qualification`, `institution`, `graduationYear`
- `currentStatus`, `primarySkills`, `experienceLevel`, `experienceSummary`
- `portfolioUrl`, `mode`, `duration`, `startDate`

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "data": { ... }
}
```

### Internship Applications
```
POST /api/internships
```
**Required fields:**
- `fullName` (string)
- `email` (string, valid email)
- `phone` (string)
- `domain` (enum: Web Development, App Development, AI & Data Science, etc.)
- `price` (number)

**Optional fields:**
- `college`, `year`, `branch`, `city`, `mode`, `startDate`, `duration`, `message`

**Response:**
```json
{
  "success": true,
  "message": "Internship application submitted successfully!",
  "data": { ... }
}
```

### Admin Statistics
```
GET /api/admin/stats
```
Returns comprehensive statistics including:
- Total counts for all submission types
- Recent submissions (last 7 days)
- Status breakdown for applications

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NODE_ENV=production
```

### 3. Run Locally
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Deployment on Render

### 1. Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` directory as the root

### 2. Configure Service
- **Name:** `promptix-backend`
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 3. Environment Variables
Add in Render dashboard:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`

### 4. Deploy
Click "Create Web Service" and wait for deployment.

### 5. Update Frontend
Update your frontend `.env` file:
```env
VITE_API_BASE_URL=https://your-app-name.onrender.com
```

## MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist IP addresses (0.0.0.0/0 for Render)
4. Get connection string and add to `.env`

## Testing

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "This is a test message"
  }'
```

### Test Health Check
```bash
curl http://localhost:5000/
```

### Test Stats
```bash
curl http://localhost:5000/api/admin/stats
```

## Error Handling

All endpoints return consistent error responses:

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Email is required", "..."]
}
```

**Duplicate Entry (409):**
```json
{
  "success": false,
  "error": "You have already applied for this role"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Failed to submit form",
  "message": "Error details..."
}
```

## Logging

The server logs all requests and important events:
- ✅ Successful submissions with ID and email
- ❌ Errors with full stack traces
- 🔗 MongoDB connection status
- 📍 Server startup information

## Security Features

- CORS configured for Vercel frontend
- Input validation on all fields
- Duplicate submission prevention
- MongoDB injection protection via Mongoose
- Environment variable protection

## Support

For issues or questions, contact the PromptiX team.
