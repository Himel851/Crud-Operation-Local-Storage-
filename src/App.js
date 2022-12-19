import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import './App.css'

export const App = () => {
  return (
    <div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Form />} />
          <Route path="/edit-employee/:id" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
};
