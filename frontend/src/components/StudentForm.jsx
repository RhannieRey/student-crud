import React, { useState, useEffect } from 'react';
import { UserPlus, Pencil, X, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function StudentForm({ editingStudent, onSubmit, onCancelEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  // Sync form state when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    });
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData({ firstname: '', lastname: '', course: '', section: '' });
      setErrors({});
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
        isEditing ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200'
      }`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isEditing ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {isEditing ? <Pencil className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 leading-tight">
              {isEditing ? `Edit Student #${editingStudent.id}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Update student details and save changes'
                : 'Fill in the information to register a student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Editing Mode
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstname" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="e.g. Juan"
            value={formData.firstname}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition outline-hidden ${
              errors.firstname
                ? 'border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-100 bg-rose-50/20'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 focus:bg-white'
            }`}
          />
          {errors.firstname && (
            <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastname" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="e.g. Dela Cruz"
            value={formData.lastname}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition outline-hidden ${
              errors.lastname
                ? 'border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-100 bg-rose-50/20'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 focus:bg-white'
            }`}
          />
          {errors.lastname && (
            <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.lastname}
            </p>
          )}
        </div>

        {/* Course & Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="course" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="e.g. BSIT"
              value={formData.course}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition outline-hidden ${
                errors.course
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-100 bg-rose-50/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 focus:bg-white'
              }`}
            />
            {errors.course && (
              <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.course}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="section" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              id="section"
              name="section"
              type="text"
              placeholder="e.g. 3A"
              value={formData.section}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 transition outline-hidden ${
                errors.section
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-100 bg-rose-50/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 focus:bg-white'
              }`}
            />
            {errors.section && (
              <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-md transition cursor-pointer disabled:opacity-50 ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? 'Update Student' : 'Add Student'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition cursor-pointer"
          >
            {isEditing ? 'Cancel Edit' : 'Clear'}
          </button>
        </div>
      </form>
    </div>
  );
}
