import { motion } from "framer-motion";
import me from "../assets/picofme.png";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
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

  const socialLinks = [
      { icon: <FaFacebook />, url: "https://facebook.com/ZA.Leghari" },
      { icon: <FaGithub />, url: "https://github.com/zahoorwebdeveloper" },
      { icon: <FaLinkedin />, url: "https://linkedin.com/in/zahoor-ahmad-leghari" },
      {icon: <FaTwitter />, url: "https://x.com/in/zahoorwebdev"}
    ];

  return (
    <div className="mt-16 sm:mt-20 lg:mt-[75px] pb-8 sm:pb-10 flex flex-col items-center justify-center px-4 sm:px-6 border-t border-gray-100 pt-10 sm:pt-12">
      {/* logo */}
      <div className="text-xl sm:text-2xl font-bold relative text-black/50 cursor-default mb-8 sm:mb-7">
        <div className="flex">
          {/* Animated decorative lines */}
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

          {/* Letter by letter animation for ZAHOOR */}
          {["Z", "A", "H"].map((l, i) => (
            <motion.h3
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={l !== "H" ? "border-t" : ""}
            >
              {l}
            </motion.h3>
          ))}

          {/* Profile Image in Logo */}
          <div className="relative w-4 h-4 sm:w-5 sm:h-5 mx-1 mt-2">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4,
              }}
              className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-orange-400"
              src={me}
              alt="zahoor"
            />
          </div>

          {["O", "R"].map((l, i) => (
            <motion.h3
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={i > 0 ? "border-t" : ""}
            >
              {l}
            </motion.h3>
          ))}
        </div>

        {/* Subtitle animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 text-[0.55rem] sm:text-[0.6rem] absolute -bottom-2 left-1.5 whitespace-nowrap"
        >
          <p>Full stack developer</p>
        </motion.div>
      </div>

      {/* navlinks */}
      <motion.div
        variants={navListVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-5 font-poppins tracking-wide mb-7 sm:mb-8 max-w-md sm:max-w-xl text-sm sm:text-base"
      >
        {[
          "Home",
          "About me",
          "Services",
          "Projects",
          "Testimonials",
          "Contact",
        ].map((item) => (
          <motion.a
            key={item}
            variants={itemVariants}
            whileHover={{ scale: 1.1, color: "#FD6F00" }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-[#FD6F00]/10 px-2 py-1.5 sm:p-2 rounded transition-colors duration-200"
            href={`#${item.toLowerCase().replace(" ", "")}`}
          >
            {item}
          </motion.a>
        ))}
      </motion.div>

      {/* social links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-6"
      >
        {socialLinks.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.url}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 flex items-center justify-center rounded-full text-lg sm:text-xl text-gray-600 hover:bg-[#FD6F00] hover:text-white transition-all shadow-sm"
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* copyright */}
      <p className="text-xs sm:text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Zahoor Ahmad. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;