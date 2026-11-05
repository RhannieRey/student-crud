// Use environment variable VITE_API_BASE_URL if set (e.g. on Render), otherwise default to local proxy
const BACKEND_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_BASE_URL = `${BACKEND_BASE}/bagsik/students`;

/**
 * Safely parses response body as JSON without throwing 'Unexpected end of JSON input'
 */
async function safeJson(response) {
  const text = await response.text();
  if (!text || !text.trim()) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn('Response was not valid JSON:', text);
    throw new Error(`Invalid response format from server: ${text.slice(0, 100)}`);
  }
}

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
    const errorText = await response.text().catch(() => '');
    throw new Error(`Failed to fetch students (${response.status}): ${errorText || response.statusText}`);
  }

  const data = await safeJson(response);
  return Array.isArray(data) ? data : [];
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
    throw new Error(`Student with ID ${id} not found (${response.status})`);
  }

  const data = await safeJson(response);
  if (!data) {
    throw new Error(`Student with ID ${id} returned empty data`);
  }
  return data;
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
    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Failed to create student (${response.status})`);
  }

  const data = await safeJson(response);
  return data || studentData;
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
    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Failed to update student (${response.status})`);
  }

  const data = await safeJson(response);
  return data || { id, ...studentData };
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
    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Failed to delete student (${response.status})`);
  }

  return response.text();
}
