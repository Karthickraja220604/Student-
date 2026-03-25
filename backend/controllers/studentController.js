import pool from "../db.js";

export const getStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error in GET students" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error in GET student by id" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    const result = await pool.query(
      "INSERT INTO students (name, email, phone, course) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, course]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error in POST student" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    const result = await pool.query(
      "UPDATE students SET name=$1, email=$2, phone=$3, course=$4 WHERE id=$5 RETURNING *",
      [name, email, phone, course, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error in PUT student" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await pool.query("DELETE FROM students WHERE id = $1", [req.params.id]);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error in DELETE student" });
  }
};