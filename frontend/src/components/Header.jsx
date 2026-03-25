import React from "react";

const Header = ({ onAdd, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-slate-600 text-white px-6 py-4 rounded-md">
      
      <h2 className="text-xl font-semibold">
        Students Data
      </h2>

     
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md flex items-center gap-2"
        >
          ➕ Add New Student
        </button>
      </div>
  
  );
};

export default Header;