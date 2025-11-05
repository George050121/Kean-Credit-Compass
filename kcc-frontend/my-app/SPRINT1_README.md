# Sprint 1 - CSV Upload and Validation

## Completed Features

### US1: Validate CSV file type/size/encoding
- File type validation: Only .csv files are accepted
- File size validation: Maximum 5MB
- Encoding validation: UTF-8 encoded files

### US2: Validate schema headers and types
- Required headers validation:
  - Course Code
  - Course Name
  - Credits
  - Grade
  - Semester
- Data type validation:
  - Credits: Must be a number between 0-6
  - Grade: Must be one of: A, A-, B+, B, B-, C+, C, C-, D, F
  - All fields: Cannot be empty

### US3: Display only acceptable majors
- Dropdown menu with valid options
- Current majors supported:
  - Computer Science
  - IT

### US4: Error when no major entered
- Major selection is required before file upload
- Error message displayed if major not selected
- Visual feedback with red border and error text

## How to Use

1. Navigate to the upload page: http://localhost:3000/upload

2. Select your major from the dropdown menu

3. Upload your CSV file by:
   - Dragging and dropping the file into the upload zone
   - Clicking the upload zone to browse for a file

4. The system will validate your file and display:
   - Success message if all validations pass
   - Error messages with specific details if validation fails
   - Preview table of uploaded courses if successful

5. Click "Upload Another File" to reset and start over

## Test Files

Two sample CSV files are provided in the `/public` folder:

1. `sample-courses.csv` - Valid CSV file with correct format
2. `sample-invalid.csv` - Invalid CSV file with various errors for testing

## CSV File Format

Your CSV file should have the following structure:

```
Course Code,Course Name,Credits,Grade,Semester
CPS 1231,Computer Programming I,4,A,Fall 2023
CPS 2231,Computer Programming II,4,B+,Spring 2024
```

### Field Requirements:
- Course Code: Required, any text
- Course Name: Required, any text
- Credits: Required, number between 0-6
- Grade: Required, valid grade (A, A-, B+, B, B-, C+, C, C-, D, F)
- Semester: Required, any text (e.g., "Fall 2023", "Spring 2024")

## Technical Implementation

### Frontend Only
All validation logic is implemented in the frontend using React:
- No backend server required for Sprint 1
- CSV parsing using native JavaScript
- File validation using FileReader API

### Files Added/Modified

New Files:
- `src/Pages/CourseUpload.jsx` - Main upload page component
- `src/styles/CourseUpload.css` - Styling for upload page
- `public/sample-courses.csv` - Valid test CSV
- `public/sample-invalid.csv` - Invalid test CSV

Modified Files:
- `src/App.js` - Added /upload route
- `src/Pages/LandingPage.jsx` - Updated navigation to include Upload link

## Validation Examples

### Success Case:
```
Course Code,Course Name,Credits,Grade,Semester
CPS 1231,Computer Programming I,4,A,Fall 2023
```

### Error Cases:

1. Missing Course Name:
```
CPS 2231,,4,B+,Spring 2024
Error: Row 2: Course Name is empty
```

2. Invalid Credits:
```
CPS 3410,Data Structures,10,A-,Fall 2024
Error: Row 2: Credits must be a number between 0 and 6
```

3. Invalid Grade:
```
MATH 1510,Calculus I,4,Z,Fall 2023
Error: Row 2: Grade "Z" is not valid
```

4. Empty Course Code:
```
,Writing Composition,3,A,Spring 2024
Error: Row 2: Course Code is empty
```

## Next Steps (Future Sprints)

- Backend API integration
- Database storage for uploaded courses
- Credit requirement checking against major requirements
- Progress visualization
- User authentication integration

