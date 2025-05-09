
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Code, Award, CheckSquare } from "lucide-react";

import ParticlesBackground from "@/components/ParticlesBackground";
import SplineBackground from "@/components/SplineBackground";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
import TasksSection from "@/components/sections/tasks/TasksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import TabSwitcher from "@/components/TabSwitcher";

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
  
  // Refs for scroll animations
  const contentTabsRef = useRef<HTMLElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const educationSectionRef = useRef<HTMLDivElement>(null);
  
  // Check if sections are in view
  const contentTabsInView = useInView(contentTabsRef, { once: false, amount: 0.65 });
  const skillsInView = useInView(skillsSectionRef, { once: false, amount: 0.5 });
  const educationInView = useInView(educationSectionRef, { once: false, amount: 0.5 });
  
  const { scrollYProgress } = useScroll();
  const tabsScaleY = useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1]);
  const tabsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);

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

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Scroll animation variants
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
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
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="w-full"
            >
              <ParticlesBackground />

              <motion.div
                initial={isInitialLoad ? "hidden" : false}
                animate="visible"
                variants={sectionVariants}
                className="relative z-10"
              >
                <motion.div variants={itemVariants}>
                  <Hero profile={profile} socialLinks={socialLinks} />
                </motion.div>

                <motion.section 
                  id="content-tabs" 
                  className="py-16 sticky top-8 z-50" 
                  variants={itemVariants}
                  ref={contentTabsRef}
                  style={{
                    scale: contentTabsInView ? 1 : 0.95,
                    opacity: contentTabsInView ? 1 : 0.8,
                  }}
                >
                  <div className="container mx-auto px-4">
                    <motion.div
                      style={{
                        scale: tabsScaleY,
                        opacity: tabsOpacity
                      }}
                    >
                      <TabSwitcher
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tabId) => setActiveTab(tabId)}
                      />
                    </motion.div>
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

                <motion.div 
                  ref={skillsSectionRef}
                  variants={scrollRevealVariants}
                  initial="hidden"
                  animate={skillsInView ? "visible" : "hidden"}
                  className="relative z-20"
                >
                  <SkillsSection skills={skills} />
                </motion.div>

                <motion.div 
                  ref={educationSectionRef}
                  variants={scrollRevealVariants}
                  initial="hidden"
                  animate={educationInView ? "visible" : "hidden"}
                  className="relative z-10"
                >
                  <EducationSection education={education} />
                </motion.div>

                <motion.div variants={itemVariants}>
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
      </div>
    </>
  );
};

export default Index;
