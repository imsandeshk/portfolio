
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, CheckSquare, ArrowUp } from "lucide-react";

import ParticlesBackground from "@/components/ParticlesBackground";
import SplineBackground from "@/components/SplineBackground";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
import TasksSection from "@/components/sections/tasks/TasksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import InterestsSection from "@/components/sections/InterestsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import TabSwitcher from "@/components/TabSwitcher";
import { Button } from "@/components/ui/button";

import {
  getProfile,
  getSocialLinks,
  getProjects,
  getCertificates,
  getTasks,
  getSkills,
  getEducation,
  getExperience,
  getContact,
} from "@/services/storageService";

const Index = () => {
  // Fetch all stored data
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const projects = getProjects();
  const certificates = getCertificates();
  const tasks = getTasks();
  const skills = getSkills();
  const education = getEducation();
  const experience = getExperience();
  const contact = getContact();

  const [activeTab, setActiveTab] = useState("projects");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Reference for sections to observe
  const sectionRefs = useRef<HTMLElement[]>([]);

  const tabs = [
    { id: "projects", label: "Projects", icon: <Code size={16} /> },
    { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
    { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
  ];

  useEffect(() => {
    // Show main content with a slight delay for better transition
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Check if we should observe elements for animation
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.85 && rect.bottom >= window.innerHeight * 0.15;
        
        if (isVisible) {
          section.classList.add('visible');
        } else {
          // Only remove the class if we're scrolling up, to maintain animations scrolling down
          if (rect.top > window.innerHeight) {
            section.classList.remove('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1.0], // Enhanced easing function for smoother animations
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <>
      <SplineBackground />
      <div className="fixed top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-black via-black/70 to-transparent z-[-9]" />

      <div className="relative z-10 bg-transparent min-h-screen">
        <AnimatePresence mode="wait">
          {mainContentVisible && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full"
            >
              <ParticlesBackground />

              <motion.div
                initial={isInitialLoad ? "hidden" : false}
                animate="visible"
                variants={sectionVariants}
                className="relative z-10"
              >
                <motion.div variants={itemVariants} className="animate-on-scroll">
                  <Hero profile={profile} socialLinks={socialLinks} />
                </motion.div>

                <motion.section id="content-tabs" className="py-16 animate-on-scroll" variants={itemVariants}>
                  <div className="container mx-auto px-4">
                    <TabSwitcher
                      tabs={tabs}
                      activeTab={activeTab}
                      onTabChange={(tabId) => setActiveTab(tabId)}
                    />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="min-h-[400px]"
                      >
                        {activeTab === "projects" && <ProjectsSection projects={projects} />}
                        {activeTab === "certificates" && (
                          <div className="grid grid-cols-1 gap-6">
                            <CertificatesSection certificates={certificates} />
                          </div>
                        )}
                        {activeTab === "tasks" && <TasksSection tasks={tasks} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.section>

                <motion.div variants={itemVariants} className="animate-on-scroll">
                  <SkillsSection skills={skills} />
                </motion.div>

                <motion.div variants={itemVariants} className="animate-on-scroll">
                  <InterestsSection />
                </motion.div>

                <motion.div variants={itemVariants} className="animate-on-scroll">
                  <EducationSection education={education} />
                </motion.div>

                <motion.div variants={itemVariants} className="animate-on-scroll">
                  <ContactSection contact={contact} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="relative z-10"
              >
                <Footer socialLinks={socialLinks} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="scroll-up-button"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Index;
