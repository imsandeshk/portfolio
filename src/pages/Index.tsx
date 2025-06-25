
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, CheckSquare } from "lucide-react";

import ParticlesBackground from "@/components/ParticlesBackground";
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
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import SkipLink from "@/components/SkipLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

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
  // Monitor performance
  usePerformanceMonitor();
  
  // Get theme information
  const { theme } = useTheme();
  
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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Show main content with a slight delay for better transition
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    
    // Add scroll event listener to reset animations on scroll direction change
    const handleScroll = () => {
      setHasScrolled(true);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimized animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <SkipLink />
      
      <div className={`fixed top-0 left-0 w-full h-[25vh] bg-gradient-to-b ${
        theme === 'light' ? 'from-light-dark via-light-dark/5 to-transparent' : 'from-black via-black/70 to-transparent'
      } z-[-9]`} />
      
      {/* Theme-specific background */}
      <div className={`fixed inset-0 z-[-10] ${
        theme === 'light' 
          ? 'bg-light-bg'
          : 'bg-black'
      } opacity-90`} />

      {/* Theme toggle positioned in top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 bg-transparent min-h-screen">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {mainContentVisible && (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="w-full"
              >
                <ParticlesBackground />

                <main id="main-content" className="relative z-10">
                  <motion.div
                    initial={isInitialLoad ? "hidden" : false}
                    animate="visible"
                    variants={sectionVariants}
                  >
                    <ErrorBoundary fallback={<div className="p-8 text-center">Hero section failed to load</div>}>
                      <motion.div variants={itemVariants}>
                        <Hero profile={profile} socialLinks={socialLinks} />
                      </motion.div>
                    </ErrorBoundary>

                    <ErrorBoundary fallback={<div className="p-8 text-center">Content tabs failed to load</div>}>
                      <motion.section id="content-tabs" className="py-16" variants={itemVariants}>
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
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="min-h-[400px]"
                            >
                              {activeTab === "projects" && (
                                <ErrorBoundary fallback={<div className="p-8 text-center">Projects failed to load</div>}>
                                  <ProjectsSection projects={projects} />
                                </ErrorBoundary>
                              )}
                              {activeTab === "certificates" && (
                                <ErrorBoundary fallback={<div className="p-8 text-center">Certificates failed to load</div>}>
                                  <div className="grid grid-cols-1 gap-6">
                                    <CertificatesSection certificates={certificates} />
                                  </div>
                                </ErrorBoundary>
                              )}
                              {activeTab === "tasks" && (
                                <ErrorBoundary fallback={<div className="p-8 text-center">Tasks failed to load</div>}>
                                  <TasksSection tasks={tasks} />
                                </ErrorBoundary>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </motion.section>
                    </ErrorBoundary>

                    <ErrorBoundary fallback={<div className="p-8 text-center">Skills section failed to load</div>}>
                      <motion.div 
                        variants={itemVariants}
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <SkillsSection skills={skills} />
                      </motion.div>
                    </ErrorBoundary>

                    <ErrorBoundary fallback={<div className="p-8 text-center">Interests section failed to load</div>}>
                      <motion.div 
                        variants={itemVariants}
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <InterestsSection />
                      </motion.div>
                    </ErrorBoundary>

                    <ErrorBoundary fallback={<div className="p-8 text-center">Education section failed to load</div>}>
                      <motion.div 
                        variants={itemVariants}
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <EducationSection education={education} />
                      </motion.div>
                    </ErrorBoundary>

                    <ErrorBoundary fallback={<div className="p-8 text-center">Contact section failed to load</div>}>
                      <motion.div 
                        variants={itemVariants}
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <ContactSection contact={contact} />
                      </motion.div>
                    </ErrorBoundary>
                  </motion.div>
                </main>

                <ErrorBoundary fallback={<div className="p-8 text-center">Footer failed to load</div>}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="relative z-10"
                  >
                    <Footer socialLinks={socialLinks} />
                  </motion.div>
                </ErrorBoundary>
                
                <ScrollToTop />
              </motion.div>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </div>
    </>
  );
};

const tabs = [
  { id: "projects", label: "Projects", icon: <Code size={16} /> },
  { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
];

export default Index;
