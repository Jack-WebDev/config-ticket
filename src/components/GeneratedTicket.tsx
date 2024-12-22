import { useFormContext } from "@/context/FormContext";
import { motion } from "framer-motion";

export default function GeneratedTicket() {
  const { formData } = useFormContext();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <motion.div
        className="space-y-8 w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center bg-white rounded-xl shadow-lg p-6 border border-gray-200 backdrop-blur-sm bg-opacity-90"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text">
              🎉 Congrats, {formData.fullName}!
            </h1>
          </motion.div>
          <h2 className="text-lg text-gray-700 mt-2">Your ticket is ready.</h2>
          <p className="text-sm text-gray-500 mt-4">
            We've emailed your ticket to
            <a
              href={`mailto:${formData.email}`}
              className="text-blue-500 hover:text-blue-600 underline transition-colors"
            >
              {" "}
              {formData.email}
            </a>
          </p>
        </motion.div>

        <motion.div
          className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-300"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-6 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2
              className="flex items-center justify-center gap-x-4 font-semibold text-2xl"
              {...floatAnimation}
            >
              <img
                src="/src/assets/logo-mark.svg"
                alt="Devs Conf logo"
                className="h-10 object-contain"
              />
              Devs Conf 2025
            </motion.h2>
            <p className="text-sm mt-2 italic">April 23, 2025 · Sandton, JHB</p>
          </motion.div>

          <motion.div
            className="p-8 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Avatar */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={formData.avatar}
                alt={`${formData.fullName}'s Avatar`}
                className="w-28 h-28 rounded-full shadow-lg border-4 border-gray-200 object-cover"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <p className="text-xl font-semibold text-gray-800">
                {formData.fullName}
              </p>
              <motion.div
                className="flex items-center justify-center gap-x-3 mt-3"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="src/assets/icon-github.svg"
                  alt="GitHub Icon"
                  className="h-5 w-5"
                />
                <p className="text-sm text-gray-600">{formData.github}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-gray-100 text-center py-4 border-t border-gray-300"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-800 font-semibold">
              ✨ Thank you for joining Devs Conf 2025! ✨
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
