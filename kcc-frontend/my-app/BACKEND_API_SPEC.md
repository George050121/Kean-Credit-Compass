# Backend API Specification for Sprint 1

This document outlines the API endpoints needed for backend integration.

## Base URL
```
http://localhost:5000/api
```

## Authentication
For future sprints, use JWT tokens in Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Get Available Majors

**Endpoint:** `GET /api/majors`

**Description:** Retrieve list of available majors for dropdown selection

**Request:**
```http
GET /api/majors
```

**Response:**
```json
{
  "success": true,
  "majors": [
    "Computer Science",
    "IT",
    "Business Administration",
    "Engineering"
  ]
}
```

**Used in:** `CourseUpload.jsx` (line 15-18)

---

## 2. Upload Course Data

**Endpoint:** `POST /api/courses/upload`

**Description:** Save uploaded course data and major information

**Request:**
```http
POST /api/courses/upload
Content-Type: application/json

{
  "major": "Computer Science",
  "courses": [
    {
      "Course Code": "CPS 1231",
      "Course Name": "Computer Programming I",
      "Credits": "4",
      "Grade": "A",
      "Semester": "Fall 2023"
    },
    {
      "Course Code": "CPS 2231",
      "Course Name": "Computer Programming II",
      "Credits": "4",
      "Grade": "B+",
      "Semester": "Spring 2024"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "studentId": "STU123456",
  "message": "Courses uploaded successfully",
  "totalCourses": 2,
  "totalCredits": 8
}
```

**Used in:** `CourseUpload.jsx` (line 204-214)

**Notes:**
- Validate all course data on backend
- Store in database with timestamp
- Associate with user account (future sprint)

---

## 3. Get Student Progress

**Endpoint:** `GET /api/student/progress/:studentId`

**Description:** Retrieve student's degree progress and course data

**Request:**
```http
GET /api/student/progress/STU123456
```

**Response:**
```json
{
  "success": true,
  "studentId": "STU123456",
  "major": "Computer Science",
  "totalRequiredCredits": 120,
  "totalCreditsCompleted": 72,
  "creditsRemaining": 48,
  "completionRate": 60,
  "courses": [
    {
      "Course Code": "CPS 1231",
      "Course Name": "Computer Programming I",
      "Credits": "4",
      "Grade": "A",
      "Semester": "Fall 2023"
    }
  ],
  "remainingCourses": [
    {
      "courseCode": "CS 110101",
      "courseName": "Advanced Programming",
      "credits": 3,
      "required": true,
      "category": "Core Courses"
    }
  ]
}
```

**Used in:** `DegreeProgress.jsx` (line 10-28)

**Notes:**
- Calculate completion based on major requirements
- Include remaining courses needed for graduation
- Cache results for performance

---

## 4. Check Authentication Status

**Endpoint:** `GET /api/auth/status`

**Description:** Check if user is authenticated and get user info

**Request:**
```http
GET /api/auth/status
Authorization: Bearer <token>
```

**Response (Authenticated):**
```json
{
  "success": true,
  "isAuthenticated": true,
  "user": {
    "id": "USER123",
    "studentId": "STU123456",
    "name": "John Doe",
    "email": "john@example.com",
    "major": "Computer Science"
  }
}
```

**Response (Not Authenticated):**
```json
{
  "success": true,
  "isAuthenticated": false,
  "user": null
}
```

**Used in:** `LandingPage.jsx` (line 8-20)

**Notes:**
- Validate JWT token
- Return user session info
- For Sprint 1, can return isAuthenticated: false

---

## 5. Get Major Requirements

**Endpoint:** `GET /api/majors/:majorName/requirements`

**Description:** Get credit requirements and course list for a specific major

**Request:**
```http
GET /api/majors/Computer%20Science/requirements
```

**Response:**
```json
{
  "success": true,
  "major": "Computer Science",
  "totalCreditsRequired": 120,
  "requirements": {
    "coreCourses": {
      "creditsRequired": 60,
      "courses": [
        {
          "courseCode": "CS 110101",
          "courseName": "Computer Science I",
          "credits": 3
        }
      ]
    },
    "electiveCourses": {
      "creditsRequired": 36,
      "courses": []
    },
    "generalEducation": {
      "creditsRequired": 24,
      "courses": []
    }
  }
}
```

**Used in:** `DegreeProgress.jsx` (line 44-46)

**Notes:**
- Store major requirements in database
- Update when curriculum changes
- Used for calculating remaining credits

---

## Database Schema Recommendations

### Students Table
```sql
CREATE TABLE students (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50),
  major VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Courses Table
```sql
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id VARCHAR(50),
  course_code VARCHAR(20),
  course_name VARCHAR(200),
  credits DECIMAL(3,1),
  grade VARCHAR(5),
  semester VARCHAR(50),
  created_at TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
```

### Majors Table
```sql
CREATE TABLE majors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE,
  total_credits_required INT,
  description TEXT
);
```

### Major Requirements Table
```sql
CREATE TABLE major_requirements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  major_id INT,
  course_code VARCHAR(20),
  course_name VARCHAR(200),
  credits DECIMAL(3,1),
  category VARCHAR(50),
  required BOOLEAN,
  FOREIGN KEY (major_id) REFERENCES majors(id)
);
```

---

## Error Handling

All endpoints should return consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid course data",
    "details": [
      "Credits must be between 0 and 6",
      "Grade 'Z' is not valid"
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `SERVER_ERROR` - Internal server error

---

## Implementation Priority for Sprint 1

1. **POST /api/courses/upload** (High Priority)
   - Core functionality for saving CSV data
   - Required for data persistence

2. **GET /api/student/progress/:studentId** (High Priority)
   - Required to display results after upload
   - Replace location.state with API data

3. **GET /api/majors** (Medium Priority)
   - Makes major selection dynamic
   - Easy to add new majors

4. **GET /api/majors/:majorName/requirements** (Medium Priority)
   - Calculates accurate remaining credits
   - Different majors have different requirements

5. **GET /api/auth/status** (Low Priority for Sprint 1)
   - Not needed until user authentication is implemented
   - Can return mock data for now

---

## Frontend Integration Steps

1. Create API service file: `src/services/api.js`
2. Implement axios or fetch wrapper with base URL
3. Add error handling and loading states
4. Replace mock data with API calls
5. Add environment variables for API URL
6. Test all endpoints with backend running

---

## Testing Endpoints

Use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example curl:
```bash
curl -X POST http://localhost:5000/api/courses/upload \
  -H "Content-Type: application/json" \
  -d '{
    "major": "Computer Science",
    "courses": [...]
  }'
```

