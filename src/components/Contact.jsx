import { motion } from "framer-motion";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

function Contact() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      navigate("/thanks");
      await api.post(`/email`, {
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      id="contact"
      className="relative mt-16 sm:mt-20 lg:mt-[75px] mb-16 sm:mb-20 max-w-[700px] w-full mx-auto flex items-center justify-center flex-col px-4 sm:px-6"
    >
      {/* Decorative background glow — consistent with About/Testimonials */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-400 blur-[100px] opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative text-3xl sm:text-4xl font-bold font-poppins text-center"
      >
        Let's Design Together
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative my-4 sm:my-5 text-gray-500 text-sm sm:text-base text-center max-w-md sm:max-w-lg"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        alias soluta, assumenda eaque voluptatum officia ratione excepturi?
        Necessitatibus, reiciendis quam?
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full mt-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 sm:py-2.5 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 hover:border-gray-400 focus:border-[#FD6F00] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          onClick={() => handleSendEmail()}
          className="bg-[#FD6F00] py-3 sm:py-2.5 px-6 text-white font-semibold rounded-lg shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
        >
          Contact Me
          <FaPaperPlane className="text-sm" />
        </motion.button>
      </motion.form>
    </div>
  );
}

export default Contact;
