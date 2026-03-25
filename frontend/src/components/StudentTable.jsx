import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="mt-6 bg-white shadow-md rounded-md p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Course</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No students added
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.phone}</td>
                <td className="p-2">{student.course}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md flex items-center"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md flex items-center"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing {students.length} entries</p>
      </div>
    </div>
  );
};

export default StudentTable;