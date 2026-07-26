import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import me from "../assets/removebg.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const skills = [
    "Full-Stack Developer",
    "MERN Stack Expert",
    "UI/UX Designer",
    "AI/ML Expert",
  ];
  const [speed, setSpeed] = useState(150);

  const handleTyping = () => {
    let i = loopNum % skills.length;
    let fullText = skills[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (!isDeleting && updatedText === fullText) {
      setSpeed(2000);
      setIsDeleting(true);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setSpeed(150);
    } else {
      setSpeed(isDeleting ? 70 : 100);
    }
  };
  useEffect(() => {
    let ticker = setInterval(() => {
      handleTyping();
    }, speed);
    return () => clearInterval(ticker);
  }, [text, speed]);

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/ZA.Leghari" },
    { icon: <FaGithub />, url: "https://github.com/zahoorwebdeveloper" },
    {
      icon: <FaLinkedin />,
      url: "https://linkedin.com/in/zahoor-ahmad-leghari",
    },
  ];

  return (
    <div
      id="home"
      className="flex flex-col lg:flex-row items-center justify-between py-10 lg:py-20 gap-12"
    >
      {/* TEXT INFO — appears second on mobile/tablet, first on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1"
      >
        <h3 className="text-xl font-semibold">Hi I am</h3>
        <h2 className="text-[#FD6F00] text-2xl font-bold">Zahoor Ahmad</h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mt-2 min-h-[160px] lg:min-h-0">
          Professional <br />
          <span className="text-[#FD6F00] border-r-4 border-orange-500 pr-2 animate-pulse">
            {text}
          </span>
        </h1>
        <p className="text-gray-600 mt-6 text-lg max-w-xl mx-auto lg:mx-0">
          Building high-performance applications with MERN stack and Next.js.
          Focusing on seamless user experiences and scalable backends.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-10 justify-center lg:justify-start">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="bg-[#FD6F00] text-white px-10 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto"
          >
            Hire Me
          </button>
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full text-xl hover:bg-[#FD6F00] hover:text-white transition-all shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* IMAGE — appears first on mobile/tablet, second on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-2/5 flex justify-center order-1 lg:order-2"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-[#FD6F00] rounded-[40% 60% 70% 30% / 40% 40% 60% 60%] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

          <motion.div
            whileHover={{ rotateY: 15, rotateX: -10 }}
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-4 border-white shadow-2xl rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm"
          >
            <img src={me} alt="Zahoor" className="w-full h-full object-cover" />
          </motion.div>

          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl z-20 hidden sm:block">
            <span className="text-[#FD6F00] font-black text-2xl">5+</span>
            <p className="text-xs text-gray-500 font-bold uppercase">
              Years Experience
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
