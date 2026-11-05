# Project Context Checkpoint: Fullstack Student CRUD

**Date Saved**: November 5, 2026  
**Repository**: [https://github.com/RhannieRey/student-crud](https://github.com/RhannieRey/student-crud)  
**Primary Branch**: `main`  
**Local Project Path**: `C:\Users\Student-00\student-crud`

---

## 1. System Overview & Tech Stack

A complete, production-ready Fullstack Student Management (CRUD) application.

| Layer | Technologies | Key Files |
|---|---|---|
| **Frontend** | Vite, React 19, JavaScript (JSX), Tailwind CSS v4 (`@tailwindcss/vite`), Lucide Icons | `frontend/src/App.jsx`<br>`frontend/src/components/StudentForm.jsx`<br>`frontend/src/components/StudentTable.jsx`<br>`frontend/src/services/studentService.js`<br>`frontend/vite.config.js` |
| **Backend** | Spring Boot, Java 21, Spring Data JPA, Hibernate, Maven | `backend/src/main/java/com/rhannierey/student/Student.java`<br>`backend/src/main/java/com/rhannierey/student/StudentController.java`<br>`backend/src/main/java/com/rhannierey/student/HomeController.java`<br>`backend/src/main/resources/application.properties`<br>`backend/Dockerfile` |
| **Database** | PostgreSQL | Local: `localhost:5432/bagsik_student`<br>Render: `student-db` (`bagsik_student`) |
| **Hosting** | Render | Frontend (Static Site)<br>Backend (Docker Web Service)<br>Database (Render PostgreSQL) |

---

## 2. API Endpoints & Routes

* **Base URL Path**: `/bagsik/students`
* **Controller**: `StudentController.java` (`@RestController`, `@CrossOrigin(origins = "*")`)

| Method | Endpoint | Description | Payload / Response |
|---|---|---|---|
| `GET` | `/` | API Status / Healthcheck | Returns `"Student CRUD API is live!..."` |
| `GET` | `/bagsik/students` | Get all students | Returns `Array<Student>` |
| `GET` | `/bagsik/students/{id}` | Get student by ID | Returns `Student` or `404` |
| `POST` | `/bagsik/students` | Create student | Body: `{ firstname, lastname, course, section }` $\rightarrow$ `201 Created` |
| `PUT` | `/bagsik/students/{id}` | Update student | Body: `{ firstname, lastname, course, section }` $\rightarrow$ `200 OK` |
| `DELETE` | `/bagsik/students/{id}` | Delete student | Returns `200 OK` |

---

## 3. Frontend UI Features (Modal-Free)

* **Split-Screen Dashboard**:
  * **Left Column (Sticky Form Card)**: Handles both **Add Student** and **Edit Student** modes with auto-filling, form reset, and field validation.
  * **Right Column (Table Card)**: Responsive table with live client-side search across name, course, and section.
  * **Inline Delete**: Clicking delete switches the table row to an inline prompt (`Delete? [Yes] [Cancel]`), completely avoiding pop-up modals.
* **Resilient Networking (`studentService.js`)**:
  * `safeJson` parser prevents `Unexpected end of JSON input` errors on empty responses.
  * Reads `VITE_API_BASE_URL` in production; falls back to Vite dev proxy (`/bagsik` $\rightarrow$ `http://localhost:8080`) locally.

---

## 4. Render Deployment Settings

### A. Frontend (Static Site)
* **Root Directory**: `frontend`
* **Build Command**: `npm install && npm run build`
* **Publish Directory**: `dist`
* **Rewrite Rule**: `Source: /*` $\rightarrow$ `Destination: /index.html` (Action: `Rewrite`)
* **Environment Variable**: `VITE_API_BASE_URL` = `https://<your-backend-url>.onrender.com`

### B. Backend (Web Service)
* **Root Directory**: `backend`
* **Runtime**: `Docker` (Uses `backend/Dockerfile` with Java 21)
* **Environment Variables**:
  * `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<HOSTNAME>:5432/bagsik_student`
  * `SPRING_DATASOURCE_USERNAME`: `student_user`
  * `SPRING_DATASOURCE_PASSWORD`: `<render-database-password>`

### C. Blueprint Option
* `render.yaml` is available in the root for automated 1-click deployments.

---

## 5. Git Commit History

```text
0e9203c feat(backend): Add root HomeController welcome endpoint at /
06e9aee fix: Use @RestController for JSON serialization and implement safeJson parser in studentService
e38ebea feat(backend): Add Dockerfile, .dockerignore, and dynamic environment properties for Render
872690d ci: Add render.yaml blueprint for automated Render deployment
08ff304 feat: Add CrossOrigin support to backend and VITE_API_BASE_URL to frontend for Render deployment
030a8e1 Initial commit: Student CRUD fullstack with Spring Boot backend and Vite React Tailwind frontend
```
