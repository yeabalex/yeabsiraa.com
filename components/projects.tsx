import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { lato,montserrat } from '@/fonts/fonts';

const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState<number|null>(null);

const projects = [
  {
    title: "Free.ly",
    description: "AI-powered article platform for discovering, creating, and sharing articles with AI-generated summaries, engagement features, and popularity-based discovery.",
    tags: ["Spring Boot", "MongoDB", "AWS", "Docker", "Next.js"],
    github: "https://github.com/yeabalex",
    live: "https://freely.yeabsiraa.com/",
  },
  {
    title: "Telegram AI Chatbot",
    description: "AI-powered Telegram bot that helps students with homework tasks, built with Telegraf and deployed on AWS Lambda.",
    tags: ["Telegraf", "AWS Lambda"],
    github: "https://github.com/yeabalex",
    live: "https://t.me/ethio_homework_helper_bot",
  },
  {
    title: "Spotify-Based Social Network",
    description: "Social media platform leveraging Spotify's API to connect users based on their music tastes and favorite artists.",
    tags: ["Express.js", "MongoDB", "Docker", "Next.js", "AWS", "Kafka"],
    github: "https://github.com/yeabalex",
    live: "https://kraftwerk.vercel.app/",
  },
  {
    title: "AI-Powered Resume Builder",
    description: "Generates resumes using pre-designed templates, allows saving multiple versions, and provides AI-powered resume editing based on job descriptions.",
    tags: ["Spring Boot", "PostgreSQL", "AWS Lambda", "Next.js"],
    github: "https://github.com/yeabalex",
    live: "https://curatefy.vercel.app/",
  },
  {
    title: "Nearby Restaurants Finder",
    description: "Fetches nearby restaurants based on user location with customizable radius and sorting by rating.",
    tags: ["Next.js", "GraphQL", "Apollo Server", "PostgreSQL", "Postgis"],
    github: "https://github.com/yeabalex",
    live: "https://youtu.be/gRXCaGHfHXs?si=Cjyq8YBnvFiaKLde",
  }
];


  return (
    <div className="py-12 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className={`${montserrat.className} text-2xl font-light mb-8 text-center`}>
          Featured Projects
        </h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className={`
                  cursor-pointer
                  border-l-2 border-gray-200 dark:border-gray-700
                  pl-6 py-3
                  transition-all duration-300
                  hover:border-l-4 hover:pl-8
                  ${activeProject === index ? 'border-l-4 pl-8' : ''}
                `}
                onClick={() => setActiveProject(activeProject === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`${montserrat.className} text-lg font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300`}>
                    {project.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeProject === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeProject === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className={`${lato.className} text-gray-400 mt-2 mb-3`}>
                        {project.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-40 hover:text-white"
                        >
                          <Github size={18} />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-white"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-gray-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectShowcase;