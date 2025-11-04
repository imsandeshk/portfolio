import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, CheckSquare } from "lucide-react";
import Spline from '@splinetool/react-spline';

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
import SplineBackground from '@/components/SplineBackground';

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
import {
  fetchProfile,
  fetchSocialLinks,
  fetchProjects as fetchProjectsRemote,
  fetchCertificates as fetchCertificatesRemote,
  fetchTasks as fetchTasksRemote,
  fetchSkills as fetchSkillsRemote,
  fetchEducation as fetchEducationRemote,
  fetchExperience as fetchExperienceRemote,
  fetchContact as fetchContactRemote,
} from "@/services/dataClient";

const Index = () => {
  
  // Local state initialized with static defaults; replaced with Supabase data after mount
  const [profile, setProfile] = useState(getProfile());
  const [socialLinks, setSocialLinks] = useState(getSocialLinks());
  const [projects, setProjects] = useState(getProjects());
  const [certificates, setCertificates] = useState(getCertificates());
  const [tasks, setTasks] = useState(getTasks());
  const [skills, setSkills] = useState(getSkills());
  const [education, setEducation] = useState(getEducation());
  const [experience, setExperience] = useState(getExperience());
  const [contact, setContact] = useState(getContact());

  const [activeTab, setActiveTab] = useState("projects");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showTopBlur, setShowTopBlur] = useState(false);
  const [showBottomBlur, setShowBottomBlur] = useState(false);

  useEffect(() => {
    // Show main content with a slight delay for better transition
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    
    // Add scroll event listener to control blur visibility
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      setHasScrolled(scrollTop > 0);
      
      // Show top blur after scrolling down 50px
      setShowTopBlur(scrollTop > 50);
      
      // Show bottom blur when not at the bottom (with 100px threshold)
      setShowBottomBlur(scrollTop + clientHeight < scrollHeight - 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch live data from Supabase on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [p, s, pr, c, t, sk, ed, ex, co] = await Promise.all([
          fetchProfile(),
          fetchSocialLinks(),
          fetchProjectsRemote(),
          fetchCertificatesRemote(),
          fetchTasksRemote(),
          fetchSkillsRemote(),
          fetchEducationRemote(),
          fetchExperienceRemote(),
          fetchContactRemote(),
        ]);
        if (!mounted) return;
        setProfile(p);
        setSocialLinks(s);
        setProjects(pr);
        setCertificates(c);
        setTasks(t);
        setSkills(sk);
        setEducation(ed);
        setExperience(ex);
        setContact(co);
      } catch (e) {
        console.warn("Failed to fetch live data from Supabase, using defaults.", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.15,
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <>
      {/* Top gradient blur - ultra smooth */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-12 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 90%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTopBlur ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Bottom gradient blur - ultra smooth */}
      <motion.div 
        className="fixed bottom-0 left-0 w-full h-10 pointer-events-none z-40"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showBottomBlur ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* iOS-style floating orbs background */}
      <div className="fixed inset-0 z-[-10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101113] via-[#1a1a1c] to-[#101113]" />
        
        {/* Floating light orbs */}
        <div className="floating-orb w-96 h-96 top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }} />
        <div className="floating-orb w-80 h-80 top-3/4 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        <div className="floating-orb w-64 h-64 bottom-1/4 left-1/2 animate-float" style={{ animationDelay: '4s' }} />
      </div>

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
              <div className="fixed inset-0 z-0 pointer-events-none">
                <ParticlesBackground />
              </div>

              <motion.div
                initial={isInitialLoad ? "hidden" : false}
                animate="visible"
                variants={sectionVariants}
                className="relative z-10"
              >
                <motion.div variants={itemVariants}>
                  <Hero profile={profile} socialLinks={socialLinks} />
                </motion.div>

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
                          duration: 0.8, // Increased for slower animation
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
                  variants={itemVariants}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <SkillsSection skills={skills} />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <InterestsSection />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <EducationSection education={education} />
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: false, amount: 0.2 }}
                >
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
              
              {/* Add the ScrollToTop component */}
              <ScrollToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SplineBackground />
    </>
  );
};

const tabs = [
  { id: "projects", label: "Projects", icon: <Code size={16} /> },
  { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
];

export default Index;
