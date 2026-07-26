import { motion } from "framer-motion";

function ProjectCard({ image, title, description, live, github }) {
  return (
    <motion.div
      // Lift the whole card slightly and add shadow on hover
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden pb-2"
    >
      {/* IMAGE SECTION with Zoom Effect */}
      <div className="m-3 overflow-hidden rounded-2xl">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-100 h-50 object-cover"
          src={image}
          alt={title}
        />
      </div>

      {/* INFO SECTION */}
      <div className="m-3">
        <div className="flex items-center gap-2">
          {/* Pulsing Green Dot */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"
          ></motion.div>
          
          <h2 className="text-xl font-Outfit font-bold text-gray-800">{title}</h2>
        </div>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* BUTTONS SECTION */}
      <div className="m-4 flex justify-between gap-3">
        <motion.a
          href={github}
          whileHover={{ scale: 1.05, backgroundColor: "#000" }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-lg font-medium text-sm transition-colors"
        >
          Github
        </motion.a>
        
        <motion.a
          href={live}
          whileHover={{ scale: 1.05, shadow: "0px 5px 15px rgba(253, 111, 0, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2 px-4 bg-[#FD6F00] rounded-lg text-white font-medium text-sm"
        >
          Live Demo
        </motion.a>
      </div>
    </motion.div>
  );
}

export default ProjectCard;