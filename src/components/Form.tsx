import { useFormContext } from "@/context/FormContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import uploadImg from '@/assets/icon-upload.svg';

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Full name must be at least 5 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  github: z.string().min(2, {
    message: "Github username must be at least 2 characters long",
  }),
  avatar: z.string().min(1, {
    message: "Avatar is required",
  }),
});

export default function Form() {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const validatedFormData = formSchema.parse(formData);
      if (validatedFormData) {
        navigate("/generatedTicket");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  return (
    <motion.form
      className="grid my-12 gap-y-8 px-4 sm:px-6 lg:px-8"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center mx-auto max-w-md"
        variants={itemVariants}
      >
        <motion.div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-xs bg-gray-50 
                     hover:border-purple-400 hover:bg-gray-100 transition-colors duration-300
                     flex flex-col justify-center items-center cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {!formData.avatar ? (
            <Label
              htmlFor="avatar"
              className="flex flex-col items-center cursor-pointer"
            >
              <motion.img
                src={uploadImg}
                alt="Upload Icon"
                className="w-12 h-12 mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <p className="text-gray-500 text-sm sm:text-base">
                Drag and drop or click to upload
              </p>
            </Label>
          ) : (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={formData.avatar}
                alt="Uploaded Avatar"
                className="rounded-lg w-32 h-32 object-cover shadow-md"
              />
              <motion.button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 
                         hover:bg-red-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          )}
          <Input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 500 * 1024) {
                  alert("File size must be less than 500KB");
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData((prev) => ({
                    ...prev,
                    avatar: e.target?.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </motion.div>
        <motion.p
          className="flex items-center gap-2 text-xs text-start text-gray-500 mt-4"
          variants={itemVariants}
        >
          <img
            src={uploadImg}
            alt="Info Icon"
            className="w-6 h-6"
          />
          Upload your photo (JPG or PNG, max size: 500KB).
        </motion.p>
      </motion.div>

      {[
        {
          id: "fullName",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email address",
        },
        {
          id: "github",
          label: "Github Username",
          type: "text",
          placeholder: "Enter your Github username",
        },
      ].map((field) => (
        <motion.div
          key={field.id}
          className="grid mx-auto max-w-md w-full items-center gap-1.5"
          variants={itemVariants}
        >
          <Label htmlFor={field.id} className="text-sm sm:text-base">
            {field.label}
          </Label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              className="w-full transition-shadow duration-200 hover:shadow-md focus:shadow-lg"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
            />
          </motion.div>
        </motion.div>
      ))}

      <motion.div variants={itemVariants} className="mx-auto max-w-md w-full">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full sm:w-auto sm:px-6 bg-gradient-to-r from-purple-600 to-blue-500 
                     hover:from-purple-700 hover:to-blue-600 transition-all duration-300
                     text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg"
            onClick={handleSubmit}
          >
            Generate My Ticket
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}
