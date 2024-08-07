import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Create from "./pages/CreateBook";
import Delete from "./pages/DeleteBook";
import Edit from "./pages/EditBook";
import Get from "./pages/GetAllBooks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<Create />} />
      <Route path="/books/delete/:id" element={<Delete />} />
      <Route path="/books/edit/:id" element={<Edit />} />
      <Route path="/books/get/:id" element={<Get />} />
    </Routes>
  );
};

export default App;
