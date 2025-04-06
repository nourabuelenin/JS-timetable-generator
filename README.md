# Timetable Generator - Port Said University

## Demo
![Timetable Generator Demo](./JS_project.gif)

## Overview
The Timetable Generator is a web-based application designed to simplify course scheduling for faculty members and students at Port Said University's Faculty of Engineering. It provides an intuitive interface for creating conflict-free timetables, integrating with the university's course database, and offering features like conflict detection, easy scheduling, and export options.

## Features
- **User Authentication**: Secure login system for authorized access.
- **Dynamic Timetable Generation**: Create timetables based on major, year, and semester.
- **Conflict Detection**: Highlights scheduling conflicts in real-time.
- **Course Management**: Add, edit, or delete courses with ease.
- **Export Options**: Export timetables to Excel or print them directly.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Technologies Used
### Frontend
- HTML, CSS, JavaScript
- Libraries: Font Awesome, Boxicons, ExcelJS, ScrollReveal

### Backend
- Node.js with Express.js
- SQLite3 for database management

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd timetable-generator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   - Ensure SQLite3 is installed.
   - Run the provided SQL scripts to create the necessary tables (`timetable` and `user`).

4. **Start the Server**:
   ```bash
   node server.js
   ```
   The application will be accessible at `http://localhost:3000`.

## Usage
1. **Login**: Use valid credentials to access the timetable generator.
2. **Generate Timetable**: Select your major, year, and semester to generate a personalized timetable.
3. **Add/Edit Courses**: Fill in the course details and add them to your timetable. Edit or delete courses as needed.
4. **Export**: Export your timetable to Excel or print it for offline use.

## API Endpoints
- `/api/login/`: Handles user authentication.
- `/api/timetable/`: Manages course addition and updates.
- `/api/showTimetable/`: Retrieves timetable data based on user input.

## Challenges
- **Authentication Issues**: Ensuring only authorized users can access the system.
- **Edit Functionality**: Implementing reliable course editing features.
- **Data Retrieval**: Fetching the correct timetable based on user-specific criteria.

## Future Improvements
- **Integration with University Portals**: Automatically sync course catalogs and updates.
- **AI-Powered Optimization**: Suggest optimal schedules based on academic goals and preferences.
- **Enhanced Data Visualization**: Provide insights into workload distribution and time management.

## Contributors
- Nour Abuelenin
- Hla Dawoud
- Rawan Zangir
- Rovan Wael

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

**POWERED BY EL NHRR GROUP**
