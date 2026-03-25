import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const API_URL = "http://localhost:5000/api/students";

  // ✅ GET students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Open form (Add)
  const handleAdd = () => {
    setEditStudent(null);
    setShowForm(true);
  };

  // ❌ Header delete (not needed now)
  const handleDelete = () => {
    alert("Use delete button in table");
  };

  // ✅ DELETE (single)
  const handleSingleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ EDIT
  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  // ✅ SAVE (Add / Update)
  const handleSave = async (data) => {
    try {
      if (editStudent) {
        await axios.put(`${API_URL}/${editStudent.id}`, data);
      } else {
        await axios.post(API_URL, data);
      }

      setShowForm(false);
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // ✅ Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <Header onAdd={handleAdd} onDelete={handleDelete} />

      {/* Form */}
      {showForm && (
        <StudentForm
          onSave={handleSave}
          onCancel={handleCancel}
          editStudent={editStudent}
        />
      )}

      {/* Table */}
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleSingleDelete}
      />
    </div>
  );
}

export default Dashboard;