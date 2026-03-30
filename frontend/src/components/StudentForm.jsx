import { useState, useEffect } from "react";

const StudentForm = ({ onSave, onCancel, editStudent }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  // ✅ store errors per field
  const [errors, setErrors] = useState({});

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    }
  }, [editStudent]);

  // ✅ Validation for single field (REAL-TIME)
  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    } else {
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
      }

      if (name === "phone") {
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(value)) {
          error = "Only numbers allowed";
        }
      }
    }

    return error;
  };

  // ✅ Handle input change (REAL-TIME validation)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // validate instantly
    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // ✅ Final validation before submit
  const validateForm = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-md shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-xl font-semibold">
            {editStudent ? "Edit Student" : "Add Student"}
          </h2>
          <button onClick={onCancel}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">

          {/* NAME */}
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* COURSE */}
          <div>
            <input
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.course ? "border-red-500" : ""
              }`}
            />
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editStudent ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;