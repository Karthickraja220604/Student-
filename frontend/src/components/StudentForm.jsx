import { useEffect, useState } from "react";

function StudentForm({ onSave, onCancel, editStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setPhone(editStudent.phone);
      setCourse(editStudent.course);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setCourse("");
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !course) {
      setError("All fields are required");
      return;
    }

    setError("");

    onSave({
      name,
      email,
      phone,
      course,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded shadow-lg">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {editStudent ? "Edit Student" : "Add Student"}
          </h2>
          <button onClick={onCancel}>❌</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && <p className="text-red-500 mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Course</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editStudent ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;