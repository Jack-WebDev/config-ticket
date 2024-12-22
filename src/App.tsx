import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormContext } from "./context/FormContext";
import HomePage from "./components/HomePage";
import { Ticket } from "./types/Ticket";
import { useState } from "react";
import GeneratedTicket from "./components/GeneratedTicket";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [formData, setFormData] = useState<Ticket>({
    fullName: "",
    email: "",
    github: "",
    avatar: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generatedTicket" element={<GeneratedTicket />} />
        </Routes>
      </Router>
    </FormContext.Provider>
  );
}
