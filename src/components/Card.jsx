// Inside Card.jsx
import { motion } from "framer-motion";

function Card({ Icon, title, discription }) {
  return (
    <motion.div 
      whileHover={{ 
        y: -10, 
        backgroundColor: "#f9f9f9", 
        boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" 
      }}
      className="p-6 rounded-xl border border-gray-200 transition-colors duration-300 cursor-default"
      // Add your existing card classes here
    >
      <div className="text-[#FD6F00] text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{discription}</p>
    </motion.div>
  );
}

export default Card