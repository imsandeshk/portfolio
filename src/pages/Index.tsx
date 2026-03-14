import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code, Award, CheckSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

import ScrollReveal from "@/components/ScrollReveal";
import FloatingElements from "@/components/FloatingElements";
import SectionDivider from "@/components/SectionDivider";
import CursorGlow from "@/components/InteractiveGrid";

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

const ParticlesBackground = lazy(() => import("@/components/ParticlesBackground"));

const Index = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

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
  const shouldUseHeavyEffects = !isMobile && !prefersReducedMotion;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    
    return () => {
      clearTimeout(timer);
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

  const sectionVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.05,
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }), [isMobile]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: isMobile ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [isMobile]);

  return (
    <>
      {/* Cursor-following gradient glow */}
      {shouldUseHeavyEffects && <CursorGlow />}

      {/* Floating ambient elements */}
      {shouldUseHeavyEffects && <FloatingElements className="z-[3]" />}

      {/* Deep background */}
      <div className="fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[#010101]" />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 15% 10%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse 70% 50% at 85% 25%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)
            `
          }}
        />
      </div>

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
              {shouldUseHeavyEffects && (
                <Suspense fallback={null}>
                  <ParticlesBackground />
                </Suspense>
              )}

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
                        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <TabSwitcher
                          tabs={tabs}
                          activeTab={activeTab}
                          onTabChange={(tabId) => setActiveTab(tabId)}
                        />
                      </motion.div>
                      
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 8, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.99 }}
                          transition={{
                            duration: isMobile ? 0.2 : 0.35,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="min-h-[400px]"
                          style={{ willChange: "opacity, transform" }}
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

    </>
  );
};

const tabs = [
  { id: "projects", label: "Projects", icon: <Code size={16} /> },
  { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
  { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
];

export default Index;
