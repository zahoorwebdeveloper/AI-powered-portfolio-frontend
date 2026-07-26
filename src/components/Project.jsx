import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios.js";

function Projects() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each project card
        delayChildren: 0.2,
      },
    },
  };

  
  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring", // Use spring for a natural "bounce"
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const fetchProjects = async () => {
    const { data } = await api.get('/projects');
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div
      id="projects"
      className="my-[75px] flex flex-col items-center overflow-hidden"
    >
      {/* Header Section: Animates from top */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center w-160"
      >
        <h1 className="text-4xl font-bold font-Outfit mb-4">Projects</h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm text-center text-gray-500"
        >
          Each project in my portfolio reflects my focus on building scalable, high-performance, and user-centric solutions. From responsive web applications and full-stack platforms to AI-powered systems and API integrations, I prioritize clean architecture, modern technologies, and real-world problem solving. Explore my work to see how I turn ideas into reliable, impactful digital products.
        </motion.p>
      </motion.div>

      {/* Grid Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 px-4"
      >
        {data?.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -12, // Lifts the card up
              transition: { duration: 0.3 },
            }}
            className="rounded-2xl cursor-pointer"
          >
            <ProjectCard
              image={project.image.url}
              title={project.title}
              description={project.description}
              live={project.live}
              github={project.github}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Projects;
