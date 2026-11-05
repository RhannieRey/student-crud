// Use environment variable VITE_API_BASE_URL if set (e.g. on Render), otherwise default to local proxy
const BACKEND_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_BASE_URL = `${BACKEND_BASE}/bagsik/students`;

/**
 * Fetch all students from the API
 * @returns {Promise<Array>} List of students
 */
export async function getAllStudents() {
  const response = await fetch(API_BASE_URL, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch students (Status: ${response.status})`);
  }

  return response.json();
}

/**
 * Fetch a single student by ID
 * @param {number|string} id 
 * @returns {Promise<Object>} Student object
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Student with ID ${id} not found`);
  }

  return response.json();
}

/**
 * Create a new student
 * @param {Object} studentData - { firstname, lastname, course, section }
 * @returns {Promise<Object>} Created student
 */
export async function createStudent(studentData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (Status: ${response.status})`);
  }

  return response.json();
}

/**
 * Update an existing student
 * @param {number|string} id 
 * @param {Object} studentData - { firstname, lastname, course, section }
 * @returns {Promise<Object>} Updated student
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student (Status: ${response.status})`);
  }

  return response.json();
}

/**
 * Delete a student by ID
 * @param {number|string} id 
 * @returns {Promise<string>} Success message
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student (Status: ${response.status})`);
  }

  return response.text();
}
