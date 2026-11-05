import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Toast from './components/Toast';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Fetch all students from backend
  const loadStudents = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await getAllStudents();
      // Ensure array
      setStudents(Array.isArray(data) ? data : []);
      if (isManualRefresh) {
        showToast('Student directory refreshed successfully', 'success');
      }
    } catch (err) {
      console.error('Failed to load students:', err);
      showToast(
        `Unable to connect to backend: ${err.message}. Ensure Spring Boot is running on port 8080.`,
        'error'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Form Submission (Add or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        const updated = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast(
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`,
          'success'
        );
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showToast(
          `Student "${created.firstname} ${created.lastname}" added successfully!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Failed to save student:', err);
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudent(student);
    // Smooth scroll to top on mobile so the form is visible
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Delete student
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Student #${id} was deleted successfully`, 'success');

      // If the deleted student was currently being edited, reset form
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
    } catch (err) {
      console.error('Failed to delete student:', err);
      showToast(`Failed to delete student: ${err.message}`, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onRefresh={() => loadStudents(true)}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area: Split-Screen Dashboard (NO MODALS) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inline Form Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Directory Table */}
          <div className="lg:col-span-7">
            <StudentTable
              students={students}
              isLoading={isLoading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD System &bull; Vite + React &bull; Tailwind CSS &bull; Spring Boot REST API
      </footer>

      {/* Floating Status Notification Toast */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
