import { useState } from "react";
import me from "../assets/picofme.png";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      x: "100%",
      transition: { delay: 0.2, ease: "easeInOut" },
    },
  };

  const navLinks = [
    "Home",
    "About me",
    "Services",
    "Projects",
    "Testimonials",
    "Contact",
  ];

  
  const handleNavClick = (e, item) => {
    e.preventDefault();
    const targetId = item.toLowerCase().replace(" ", "");
    const el = document.getElementById(targetId);

    setIsOpen(false); 

    if (el) {
      setTimeout(
        () => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        isOpen ? 150 : 0,
      );
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-10 bg-white/80 backdrop-blur-md shadow-sm"
    >
      {/* LOGO SECTION */}
      <div className="text-2xl font-bold relative text-black/50 cursor-default">
        <div className="flex">
          {[-30, 0, 30].map((rotate, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{ rotate: `${rotate}deg` }}
              className={`h-4 w-1 bg-red-400/50 absolute -top-3 ${
                i === 0 ? "left-13" : i === 1 ? "left-15" : "left-17"
              }`}
            />
          ))}

          {["Z", "A", "H"].map((l, i) => (
            <motion.h3 key={i} className={l !== "H" ? "border-t" : ""}>
              {l}
            </motion.h3>
          ))}

          <div className="relative w-5 h-5 mx-1 mt-2">
            <img
              className="absolute w-5 h-5 rounded-full object-cover border border-orange-400"
              src={me}
              alt="zahoor"
            />
          </div>

          {["O", "R"].map((l, i) => (
            <motion.h3 key={i} className={i > 0 ? "border-t" : ""}>
              {l}
            </motion.h3>
          ))}
        </div>
        <div className="text-gray-400 text-[0.6rem] absolute -bottom-2 left-1.5 whitespace-nowrap">
          <p>Full stack developer</p>
        </div>
      </div>

      {/* DESKTOP NAVIGATION LINKS */}
      <motion.div
        variants={navListVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex gap-5 font-poppins tracking-wide"
      >
        {navLinks.map((item) => (
          <motion.a
            key={item}
            variants={itemVariants}
            whileHover={{ scale: 1.1, color: "#FD6F00" }}
            className="hover:bg-[#FD6F00]/10 p-2 rounded transition-colors duration-200 cursor-pointer"
            href={`#${item.toLowerCase().replace(" ", "")}`}
            onClick={(e) => handleNavClick(e, item)}
          >
            {item}
          </motion.a>
        ))}
      </motion.div>

      {/* DESKTOP BUTTON */}
      <motion.a
        href="../../public/Zahoor_Ahmad_Resume.pdf"
        download
        className="hidden md:block p-3 cursor-pointer font-bold font-poppins bg-[#FD6F00] text-white rounded shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Download CV
      </motion.a>

      {/* MOBILE MENU ICON */}
      <div
        className="lg:hidden text-3xl cursor-pointer text-[#FD6F00]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenuAlt3 />}
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-3/4 bg-white shadow-2xl lg:hidden flex flex-col p-10 z-[60]"
          >
            <div className="flex justify-end mb-10">
              <HiX
                className="text-4xl text-[#FD6F00] cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <motion.div
              variants={navListVariants}
              className="flex flex-col gap-6 text-xl font-semibold"
            >
              {navLinks.map((item) => (
                <motion.a
                  key={item}
                  variants={itemVariants}
                  onClick={(e) => handleNavClick(e, item)}
                  className="border-b border-gray-100 pb-2 hover:text-[#FD6F00] cursor-pointer"
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                >
                  {item}
                </motion.a>
              ))}

              <motion.a
                href="../../public/Zahoor_Ahmad_Resume.pdf"
                download
                variants={itemVariants}
                className="mt-4 p-4 text-center bg-[#FD6F00] text-white rounded-xl shadow-lg"
              >
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
