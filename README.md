# Student CRUD Fullstack Application

A complete Student CRUD (Create, Read, Update, Delete) fullstack application with a Spring Boot REST API backend and a modern Vite + React (JavaScript) + Tailwind CSS frontend.

---

## 📁 Repository Structure

```text
student-crud/
├── backend/                  # Spring Boot Java REST API
│   ├── src/main/java/com/rhannierey/student/
│   │   ├── Student.java               # JPA Entity
│   │   ├── StudentRepository.java     # Spring Data Repository
│   │   ├── StudentController.java     # REST Controller (/bagsik/students)
│   │   └── StudentApplication.java    # Spring Boot Main Application
│   ├── src/main/resources/
│   │   └── application.properties     # Database & Hibernate Config
│   └── pom.xml
└── frontend/                 # Vite + React (JS) + Tailwind CSS
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx             # Top bar with backend status
    │   │   ├── StudentForm.jsx        # Inline Form Card (Add / Edit modes)
    │   │   ├── StudentTable.jsx       # Interactive Table with Search & Inline Delete
    │   │   └── Toast.jsx              # Status notifications
    │   ├── services/
    │   │   └── studentService.js      # REST API client
    │   ├── App.jsx                    # Split-screen dashboard layout (No modals)
    │   └── index.css                  # Tailwind CSS import
    ├── vite.config.js                 # Proxy config (/bagsik -> localhost:8080)
    └── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Java 21** or later
* **Node.js** (v18+ or v24+) & npm
* **PostgreSQL** database (database name: `bagsik_student`)

---

### 2. Backend Setup (Spring Boot)

1. Ensure PostgreSQL is running on port `5432` with a database named `bagsik_student`.
2. Configure credentials in `backend/src/main/resources/application.properties` if different:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/bagsik_student
   spring.datasource.username=postgres
   spring.datasource.password=admin
   ```
3. Run the Spring Boot application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *(or run `mvnw.cmd spring-boot:run` on Windows)*

The backend will start at `http://localhost:8080`.

#### REST API Endpoints:
* `GET /bagsik/students` - Retrieve all students
* `GET /bagsik/students/{id}` - Retrieve a student by ID
* `POST /bagsik/students` - Add a new student
* `PUT /bagsik/students/{id}` - Update a student
* `DELETE /bagsik/students/{id}` - Delete a student

---

### 3. Frontend Setup (Vite + React + Tailwind)

1. Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser at **`http://localhost:5173/`**.

> **Note**: Vite dev server proxies `/bagsik` requests to `http://localhost:8080`, preventing any CORS issues during development.

---

## 🎨 Frontend Features
* **Modern Tailwind CSS UI**: Clean cards, typography, and badges.
* **Modal-Free Design**:
  * Inline Form Card on the left with dynamic "Add New" and "Edit" modes.
  * Real-time search and filter across name, course, and section.
  * Inline delete confirmation directly in the row (`Delete? [Yes] [Cancel]`).
* **Toast Notifications**: Auto-dismissing success and error alerts.
