import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiDocker,
} from "react-icons/si";

function About() {
  const skills = [
    { name: "Frontend", level: "90%" },
    { name: "Backend", level: "85%" },
    { name: "AI/ML", level: "70%" },
    { name: "System Design", level: "80%" },
    { name: "DevOps", level: "75%" },
  ];

  const barVariants = (width) => ({
    hidden: { width: 0 },
    visible: {
      width: width,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.2 },
    },
  });

  // Tech stack icons placed around the ring — position is % from center (top-left origin)
  const techStack = [
    { icon: <SiReact />, color: "#61DAFB", top: "2%", left: "50%" },
    { icon: <SiNodedotjs />, color: "#3C873A", top: "20%", left: "88%" },
    { icon: <SiMongodb />, color: "#47A248", top: "55%", left: "94%" },
    { icon: <SiExpress />, color: "#000000", top: "85%", left: "78%" },
    { icon: <SiTailwindcss />, color: "#38BDF8", top: "88%", left: "22%" },
    { icon: <SiJavascript />, color: "#F7DF1E", top: "55%", left: "4%" },
    { icon: <SiTypescript />, color: "#3178C6", top: "20%", left: "10%" },
    { icon: <SiDocker />, color: "#2496ED", top: "2%", left: "50%", offset: true },
  ];

  return (
    <section
      id="aboutme"
      className="flex flex-col lg:flex-row items-center my-12 sm:my-16 lg:my-[70px] gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      {/* 1. TECH STACK COLLAGE — hidden on phones, shown from md (tablet) up */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-full lg:w-1/2 justify-center order-first lg:order-last"
      >
        <motion.div className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80 lg:w-[460px] lg:h-[460px]">

          {/* Soft pulsing spotlight glow */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[75%] h-[75%] rounded-full bg-orange-400 blur-[80px]"
          />

          {/* Subtle dot-grid texture, masked to fade at edges */}
          <div
            className="absolute w-[130%] h-[130%] opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FD6F00 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              maskImage: "radial-gradient(circle, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 75%)",
            }}
          />

          {/* Rotating gradient border ring (center frame) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 md:w-44 md:h-44 lg:w-56 lg:h-56 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #FD6F00, #ffffff00 25%, #ffffff00 50%, #FD6F00 75%, #ffffff00 100%)",
              padding: "4px",
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl md:text-3xl lg:text-4xl font-poppins font-extrabold text-[#FD6F00]">
                MERN
              </span>
            </div>
          </motion.div>

          {/* Counter-rotating dashed orbit ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute w-[85%] h-[85%] rounded-full border-2 border-dashed border-orange-400/40"
          />

          {/* Floating tech icon cards orbiting the center */}
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              className="absolute"
              style={{ top: tech.top, left: tech.left }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                whileHover={{ scale: 1.15 }}
                className="w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl md:text-2xl lg:text-3xl border border-gray-100"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 2. INFO SECTION (Text Content) */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-black text-center lg:text-left">
          About Me
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-5 font-roboto text-gray-500 text-center lg:text-left leading-relaxed max-w-md sm:max-w-lg mx-auto lg:mx-0 lg:max-w-none">
          My journey has led me through 30+ production-grade projects as a
          Freelancer. I focus on the{" "}
          <span className="text-black font-bold">MERN stack</span>, ensuring
          high performance and security in every line of code.
        </p>

        {/* Dynamic Skill Bars */}
        <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="w-full max-w-md sm:max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FD6F00] shrink-0"></div>
                <h4 className="text-base sm:text-lg font-bold">{skill.name}</h4>
              </div>

              <div className="w-full h-2 sm:h-2.5 bg-gray-200 rounded-full relative overflow-visible">
                <motion.div
                  variants={barVariants(skill.level)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="h-full bg-[#FD6F00] rounded-full relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute -right-2 -top-[3px] w-4 h-4 bg-white border-2 border-[#FD6F00] rounded-full shadow-md"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default About;