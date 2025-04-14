
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, CheckSquare } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
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
  // Get data from storage
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const projects = getProjects();
  const certificates = getCertificates();
  const tasks = getTasks();
  const skills = getSkills();
  const education = getEducation();
  const experience = getExperience();
  const contact = getContact();

  // States for animation and UI control
  const [activeTab, setActiveTab] = useState("projects");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  
  const tabs = [
    { id: "projects", label: "Projects", icon: <Code size={16} /> },
    { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
    { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
  ];

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Disable initial load animation if coming back to the page
useEffect(() => {
  setMainContentVisible(true);
  setIsInitialLoad(false);
}, []);




  // Page scroll animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="bg-transparent min-h-screen">
      
      {/* Main content with animated entrance */}
      <AnimatePresence mode="wait">
        {mainContentVisible && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full"
          >
            <ParticlesBackground />
            
            {/* Hero Section with staggered animation */}
            <motion.div
              initial={isInitialLoad ? "hidden" : false}
              animate="visible"
              variants={sectionVariants}
              className="relative z-10"
            >
              <motion.div variants={itemVariants}>
                <Hero profile={profile} socialLinks={socialLinks} />
              </motion.div>
            
              {/* Content Tabs Section */}
              <motion.section id="content-tabs" className="py-16" variants={itemVariants}>
                <div className="container mx-auto px-4">
                  <TabSwitcher
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                  />
                  
                  {/* Tab Content with AnimatePresence for smooth transitions */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1] 
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
              
              {/* Skills Section */}
              <motion.div variants={itemVariants}>
                <SkillsSection skills={skills} />
              </motion.div>
              
              {/* Education Section */}
              <motion.div variants={itemVariants}>
                <EducationSection education={education} />
              </motion.div>
              
              {/* Contact Section */}
              <motion.div variants={itemVariants}>
                <ContactSection contact={contact} />
              </motion.div>
            </motion.div>
            
            {/* Footer with fade in animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative z-10"
            >
              <Footer socialLinks={socialLinks} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
