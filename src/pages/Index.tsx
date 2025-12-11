import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
import SplineBackground from '@/components/SplineBackground';
import ScrollReveal from "@/components/ScrollReveal";
import FloatingElements from "@/components/FloatingElements";
import SectionDivider from "@/components/SectionDivider";

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
  const [showTopBlur, setShowTopBlur] = useState(false);
  const [showBottomBlur, setShowBottomBlur] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      setShowTopBlur(scrollTop > 50);
      setShowBottomBlur(scrollTop + clientHeight < scrollHeight - 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <>
      {/* Floating ambient elements */}
      <FloatingElements className="z-0" />

      {/* Premium top gradient blur - smooth fade - taller on mobile */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-28 sm:h-24 md:h-20 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, #000000 20%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showTopBlur ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Premium bottom gradient blur - smooth fade - taller on mobile */}
      <motion.div 
        className="fixed bottom-0 left-0 w-full h-24 sm:h-20 md:h-16 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to top, #000000 0%, #000000 25%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.15) 85%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showBottomBlur ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Deep background with mesh gradient */}
      <motion.div 
        className="fixed inset-0 z-[-20]"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 20% 10%, rgba(255, 140, 66, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 80% 20%, rgba(74, 144, 226, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 90% 70% at 50% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 10% 60%, rgba(255, 107, 157, 0.04) 0%, transparent 50%)
            `
          }}
        />
      </motion.div>

      <div className="relative z-10 bg-transparent min-h-screen">
        <AnimatePresence mode="wait">
          {mainContentVisible && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              <ParticlesBackground />

              <motion.div
                initial={isInitialLoad ? "hidden" : false}
                animate="visible"
                variants={sectionVariants}
                className="relative z-10"
              >
                {/* Hero Section */}
                <motion.div variants={itemVariants}>
                  <Hero profile={profile} socialLinks={socialLinks} />
                </motion.div>

                <SectionDivider variant="glow" />

                {/* Content Tabs Section */}
                <ScrollReveal direction="up" blur>
                  <section id="content-tabs" className="section-wrapper">
                    <div className="container mx-auto px-4">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                          initial={{ opacity: 0, y: 40, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -30, scale: 0.98 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
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
                  </section>
                </ScrollReveal>

                <SectionDivider variant="line" />

                {/* Skills Section */}
                <ScrollReveal direction="up" delay={0.1}>
                  <SkillsSection skills={skills} />
                </ScrollReveal>

                <SectionDivider variant="gradient" />

                {/* Interests Section */}
                <ScrollReveal direction="scale" delay={0.1}>
                  <InterestsSection />
                </ScrollReveal>

                <SectionDivider variant="wave" />

                {/* Education Section */}
                <ScrollReveal direction="left" delay={0.1}>
                  <EducationSection education={education} />
                </ScrollReveal>

                <SectionDivider variant="glow" />

                {/* Contact Section */}
                <ScrollReveal direction="up" delay={0.1} blur>
                  <ContactSection contact={contact} />
                </ScrollReveal>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative z-10"
              >
                <Footer socialLinks={socialLinks} />
              </motion.div>
              
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
