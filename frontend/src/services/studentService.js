import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

// GET all students
export const getStudents = () => {
  return axios.get(API_URL);
};

// CREATE student
export const createStudent = (data) => {
  return axios.post(API_URL, data);
};

// UPDATE student
export const updateStudent = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

// DELETE student
export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};