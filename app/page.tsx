'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import ProjectShowcase from '@/components/projects';
import RecentTracks from '@/components/spotify';
import { lato,montserrat } from '@/fonts/fonts';

export default function MinimalistPortfolio() {

  const [darkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <>
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Theme Switcher */}
          <div className="absolute top-6 right-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl font-light mb-4 ${montserrat.className}`}
            >
              Yeabsira A.
            </motion.h1>
            <p className={`text-lg text-gray-600 dark:text-gray-400 mb-8 ${lato.className}`}>
              Software Developer | Cloud Engineer | Full Stack Developer
            </p>
          </div>
          <div className="text-center mb-12">
            <p className={`text-gray-700 dark:text-gray-400 max-w-xl mx-auto ${lato.className}`}>
            I focus on building scalable software solutions and have extensive experience in developing web applications, RESTful APIs, and cloud infrastructure (AWS).
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center space-x-8 items-center"
          >
            {[
              { Icon: Github, href: "https://github.com/yeabalex" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/yeabsira-alemu/" },
              { Icon: Twitter, href: "https://x.com/yeabalex_" }
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1h0GSoE9Nk69iYqaqV3MFcmsacI738ywO/view?usp=drive_link"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${lato.className} flex items-center border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all`}
            >
              <Download size={16} className="mr-2" />
              Resume/CV
            </motion.a>
          </motion.div>
          <RecentTracks/>
        </motion.div>
      </div>
      <ProjectShowcase/>
      <script src="https://chat.koolsalesai.com/widget.js" data-user-id="9e5981b1-2089-4358-964b-0c0d6404738c" async></script>
    </div>
    </>
  );
}