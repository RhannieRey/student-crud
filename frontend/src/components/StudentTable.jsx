import React, { useState } from 'react';
import { Search, Pencil, Trash2, AlertTriangle, Check, X, User, GraduationCap, Layers } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  editingStudentId,
  onEdit,
  onDelete,
  deletingId,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
    const course = (student.course || '').toLowerCase();
    const section = (student.section || '').toLowerCase();
    const id = String(student.id || '');

    return (
      fullName.includes(q) ||
      course.includes(q) ||
      section.includes(q) ||
      id.includes(q)
    );
  });

  const handleStartDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header with Search and Stats */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900 leading-tight">
              Student Directory
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {students.length} {students.length === 1 ? 'Student' : 'Students'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse, search, edit, and manage registered students
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, course, section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4 text-right w-44">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-medium text-slate-600">Loading students...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto px-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                      <User className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {searchQuery ? 'No matching students found' : 'No students registered yet'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {searchQuery
                        ? `No results match "${searchQuery}". Clear search or try another keyword.`
                        : 'Use the form on the left to add your first student record.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isEditing = editingStudentId === student.id;
                const isConfirmingDelete = confirmDeleteId === student.id;
                const isBeingDeleted = deletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isEditing
                        ? 'bg-amber-50/60 font-medium'
                        : isConfirmingDelete
                        ? 'bg-rose-50/50'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      #{student.id}
                    </td>

                    {/* Full Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {student.firstname ? student.firstname.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">
                            {student.firstname} {student.lastname}
                          </p>
                          <p className="text-xs text-slate-400 font-normal">
                            {student.course} - {student.section}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        <GraduationCap className="w-3 h-3 text-blue-500" />
                        {student.course}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <Layers className="w-3 h-3 text-emerald-500" />
                        {student.section}
                      </span>
                    </td>

                    {/* Actions (Strictly INLINE, NO MODALS) */}
                    <td className="py-3.5 px-4 text-right">
                      {isConfirmingDelete ? (
                        /* Inline Row Confirmation */
                        <div className="inline-flex items-center gap-1.5 bg-white p-1 rounded-xl border border-rose-200 shadow-xs">
                          <span className="text-xs text-rose-700 font-medium px-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Delete?
                          </span>
                          <button
                            onClick={() => handleConfirmDelete(student.id)}
                            disabled={isBeingDeleted}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                            title="Confirm deletion"
                          >
                            {isBeingDeleted ? 'Deleting...' : 'Yes'}
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            disabled={isBeingDeleted}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
                            title="Cancel deletion"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        /* Standard Action Buttons */
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onEdit(student)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                              isEditing
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700'
                            }`}
                            title="Edit this student"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleStartDelete(student.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition cursor-pointer"
                            title="Delete this student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Results Count */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span>
          Showing <span className="font-semibold text-slate-700">{filteredStudents.length}</span> of{' '}
          <span className="font-semibold text-slate-700">{students.length}</span> recorded students
        </span>
        {searchQuery && (
          <span className="text-indigo-600 font-medium">
            Filtered by: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
}
