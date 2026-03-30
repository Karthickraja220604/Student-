import { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // ✅ Snackbar
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
  });

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // ✅ Loading
  const [loading, setLoading] = useState(false);

  // ✅ Fetch students (SIMPLE)
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents();
      setStudents(res.data);
    } catch (error) {
      showSnackbar("Failed to fetch students", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Snackbar auto hide
  useEffect(() => {
    if (snackbar.message) {
      const timer = setTimeout(() => {
        setSnackbar({ message: "", type: "" });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [snackbar.message]);

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type });
  };

  // ✅ Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ✅ Add
  const handleAdd = () => {
    setEditStudent(null);
    setShowForm(true);
  };

  // ✅ Delete
  const handleSingleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteStudent(id);
      showSnackbar("Student deleted", "success");
      await fetchStudents();
    } catch {
      showSnackbar("Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit
  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  // ✅ Save (SIMPLE + FIXED)
  const handleSave = async (data) => {
    try {
      setLoading(true);

      if (editStudent) {
        await updateStudent(editStudent.id, data);
        showSnackbar("Updated successfully", "success");
      } else {
        await createStudent(data);
        showSnackbar("Added successfully", "success");

        // ✅ Move to last page after add
        const newTotal = students.length + 1;
        const lastPage = Math.ceil(newTotal / studentsPerPage);
        setCurrentPage(lastPage);
      }

      await fetchStudents();

      setShowForm(false);
      setEditStudent(null);
    } catch {
      showSnackbar("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Header onAdd={handleAdd} />

        {showForm && (
          <StudentForm
            onSave={handleSave}
            onCancel={handleCancel}
            editStudent={editStudent}
          />
        )}

        {/* ✅ Loading Spinner (SIMPLE) */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* ✅ Table */}
        {!loading && (
          <StudentTable
            students={
              students.length > studentsPerPage
                ? currentStudents
                : students
            }
            onEdit={handleEdit}
            onDelete={handleSingleDelete}
          />
        )}

        {/* ✅ Pagination */}
        {students.length > studentsPerPage && !loading && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>

            <span>
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ✅ Snackbar */}
      {snackbar.message && (
        <div className="fixed bottom-5 w-full flex justify-center">
          <div
            className={`px-4 py-2 text-white rounded ${
              snackbar.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {snackbar.message}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;