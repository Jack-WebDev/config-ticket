import { Ticket } from "@/types/Ticket";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface FormContextType {
  formData: Ticket;
  setFormData: Dispatch<SetStateAction<Ticket>>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
}
