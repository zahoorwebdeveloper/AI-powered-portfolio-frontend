import Card from "./card";
import { FaCode } from "react-icons/fa";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { motion } from "framer-motion";

function Services() {
  // Container variants for staggering the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each card appears 0.2s after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      id="services"
      className="my-12 sm:my-16 lg:my-[75px] flex flex-col items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-0"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-2xl text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-Outfit mb-3 sm:mb-4">
          Services
        </h1>
        <p className="text-sm sm:text-base text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          laboriosam, consequuntur perferendis Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Delectus, non.
        </p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-8 sm:mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4 place-items-center"
      >
        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <Card
            Icon={FaCode}
            title={"Frontend"}
            discription={"Custom responsive web development delivering interactive, fast, user-centric digital interfaces."}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <Card
            Icon={PiBracketsCurlyBold}
            title={"Backend"}
            discription={"Secure, scalable server-side systems managing databases, APIs, and business logic."}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <Card
            Icon={FaGear}
            title={"System Design"}
            discription={"Scalable architectural planning defining software components, data flows, and infrastructure."}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <Card
            Icon={RiComputerFill}
            title={"devOps"}
            discription={"Streamlining software delivery through automated deployment, continuous integration, and infrastructure management."}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Services;