
// Types
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  url?: string;
  github?: string;
  pinned: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
}

export interface Feedback {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  location?: string;
}

// Storage keys
const STORAGE_KEYS = {
  PROFILE: "portfolio_profile",
  PROJECTS: "portfolio_projects",
  CERTIFICATES: "portfolio_certificates",
  TASKS: "portfolio_tasks",
  SKILLS: "portfolio_skills",
  EDUCATION: "portfolio_education",
  EXPERIENCE: "portfolio_experience",
  SOCIAL_LINKS: "portfolio_social_links",
  FEEDBACK: "portfolio_feedback",
  CONTACT: "portfolio_contact",
  ADMIN_PASSWORD: "portfolio_admin_password",
  IS_ADMIN: "portfolio_is_admin",
};

// Helper function to generate IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Initialize with sample data if not exists
const initializeStorage = () => {
  // Profile
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    const defaultProfile: ProfileInfo = {
      name: "Sandesh K",
      title: "Web Developer",
      bio: "Passionate web developer with expertise in building modern, responsive web applications.",
      email: "sandeshkullolli4@gmail.com",
      phone: "+1 (555) 123-4567",
      location: "Raghuvanahalli, Banagalore",
      profileImage: "/placeholder.svg", // Default image, will be replaced by user
    };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
  }

  // Social links
  if (!localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS)) {
    const defaultSocialLinks: SocialLink[] = [
      {
        id: generateId(),
        platform: "GitHub",
        url: "https://github.com/iamsandeshk",
        icon: "Github",
      },
      {
        id: generateId(),
        platform: "LinkedIn",
        url: "https://linkedin.com/in/sandesh-kullolli",
        icon: "Linkedin",
      },
      {
        id: generateId(),
        platform: "Twitter",
        url: "https://twitter.com/The1UX",
        icon: "Twitter",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.SOCIAL_LINKS,
      JSON.stringify(defaultSocialLinks)
    );
  }

  // Projects
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    const defaultProjects: Project[] = [
      {
        id: generateId(),
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with product listings, cart, and secure checkout.",
        image: "/placeholder.svg",
        category: "Web Development",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        url: "https://example.com/ecommerce",
        github: "https://github.com/iamsandeshk/ecommerce",
        pinned: true,
      },
      {
        id: generateId(),
        title: "Task Management App",
        description:
          "A productivity app for managing tasks, projects, and team collaboration.",
        image: "/placeholder.svg",
        category: "Web App",
        tags: ["React", "Firebase", "Material UI"],
        url: "https://example.com/taskapp",
        github: "https://github.com/sandeshk/taskapp",
        pinned: true,
      },
      {
        id: generateId(),
        title: "Weather Dashboard",
        description:
          "Real-time weather dashboard with forecasts and historical data visualization.",
        image: "/placeholder.svg",
        category: "Web App",
        tags: ["JavaScript", "OpenWeather API", "ChartJS"],
        url: "https://example.com/weather",
        github: "https://github.com/sandeshk/weather",
        pinned: false,
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.PROJECTS,
      JSON.stringify(defaultProjects)
    );
  }

  // Certificates
  if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
    const defaultCertificates: Certificate[] = [
      {
        id: generateId(),
        title: "React Certification",
        issuer: "Meta",
        date: "2023-06-15",
        url: "https://example.com/cert1",
      },
      {
        id: generateId(),
        title: "Advanced JavaScript",
        issuer: "Udemy",
        date: "2022-09-10",
        url: "https://example.com/cert2",
      },
      {
        id: generateId(),
        title: "UI/UX Design Fundamentals",
        issuer: "Coursera",
        date: "2022-03-22",
        url: "https://example.com/cert3",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.CERTIFICATES,
      JSON.stringify(defaultCertificates)
    );
  }

  // Tasks
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    const defaultTasks: Task[] = [
      {
        id: generateId(),
        title: "Redesign Portfolio",
        description: "Update the design of my personal portfolio website",
        completed: true,
        dueDate: "2023-12-15",
        priority: "high",
      },
      {
        id: generateId(),
        title: "Learn GraphQL",
        description: "Complete the GraphQL course and build a sample project",
        completed: false,
        dueDate: "2024-02-28",
        priority: "medium",
      },
      {
        id: generateId(),
        title: "Contribute to Open Source",
        description: "Make meaningful contributions to open source projects",
        completed: false,
        dueDate: "2024-03-30",
        priority: "low",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultTasks));
  }

  // Skills
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    const defaultSkills: Skill[] = [
      {
        id: generateId(),
        name: "React",
        level: 5,
        category: "Frontend",
      },
      {
        id: generateId(),
        name: "TypeScript",
        level: 4,
        category: "Frontend",
      },
      {
        id: generateId(),
        name: "Node.js",
        level: 4,
        category: "Backend",
      },
      {
        id: generateId(),
        name: "MongoDB",
        level: 3,
        category: "Database",
      },
      {
        id: generateId(),
        name: "AWS",
        level: 3,
        category: "DevOps",
      },
      {
        id: generateId(),
        name: "UI/UX Design",
        level: 4,
        category: "Design",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(defaultSkills));
  }

  // Education
  if (!localStorage.getItem(STORAGE_KEYS.EDUCATION)) {
    const defaultEducation: Education[] = [
      {
        id: generateId(),
        institution: "K S INSTITUTE OF TECHNOLOGY",
        degree: "Bachelor Degree",
        field: "Computer Science & Engineering",
        startDate: "2022-11-01",
        endDate: "2026-07-30",
        description:
          "Focused on software engineering and artificial intelligence.",
      },
     
    ];
    localStorage.setItem(
      STORAGE_KEYS.EDUCATION,
      JSON.stringify(defaultEducation)
    );
  }

  // Experience
  if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCE)) {
    const defaultExperience: Experience[] = [
      {
        id: generateId(),
        company: "Tech Innovations Inc.",
        position: "Senior Frontend Developer",
        startDate: "2021-03-01",
        endDate: "Present",
        description:
          "Leading the frontend development team in creating responsive web applications using React and TypeScript.",
        technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"],
      },
      {
        id: generateId(),
        company: "Digital Solutions LLC",
        position: "Full Stack Developer",
        startDate: "2018-07-01",
        endDate: "2021-02-28",
        description:
          "Developed and maintained full-stack web applications for clients in various industries.",
        technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.EXPERIENCE,
      JSON.stringify(defaultExperience)
    );
  }

  // Feedback
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
    const defaultFeedback: Feedback[] = [
      {
        id: generateId(),
        name: "John Smith",
        email: "john@example.com",
        rating: 5,
        comment: "Excellent portfolio! Your projects are impressive.",
        date: "2023-11-15T14:30:00Z",
      },
      {
        id: generateId(),
        name: "Emily Johnson",
        email: "emily@example.com",
        rating: 4,
        comment: "Very nice design and great showcase of your skills.",
        date: "2023-10-20T09:15:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(defaultFeedback));
  }

  // Contact info
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
    const defaultContact: ContactInfo = {
      email: "sandeshkullolli4@gmail.com",
      phone: "+1 (555) 123-4567",
      address: "Raghuvanahalli",
      location: "Bangalore-560109",
    };
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(defaultContact));
  }

  // Admin password (default: admin123)
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, "@#Sandesh58");
  }
};

// Call the init function
initializeStorage();

// CRUD operations for profile
export const getProfile = (): ProfileInfo => {
  const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return profile ? JSON.parse(profile) : null;
};

export const updateProfile = (profile: ProfileInfo): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

// CRUD operations for social links
export const getSocialLinks = (): SocialLink[] => {
  const links = localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS);
  return links ? JSON.parse(links) : [];
};

export const addSocialLink = (link: Omit<SocialLink, "id">): SocialLink => {
  const newLink = { ...link, id: generateId() };
  const links = getSocialLinks();
  links.push(newLink);
  localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(links));
  return newLink;
};

export const updateSocialLink = (link: SocialLink): void => {
  const links = getSocialLinks();
  const index = links.findIndex((l) => l.id === link.id);
  if (index !== -1) {
    links[index] = link;
    localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(links));
  }
};

export const deleteSocialLink = (id: string): void => {
  const links = getSocialLinks();
  const filteredLinks = links.filter((link) => link.id !== id);
  localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(filteredLinks));
};

// CRUD operations for projects
export const getProjects = (): Project[] => {
  const projects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return projects ? JSON.parse(projects) : [];
};

export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find((project) => project.id === id);
};

export const addProject = (project: Omit<Project, "id">): Project => {
  const newProject = { ...project, id: generateId() };
  const projects = getProjects();
  projects.push(newProject);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (project: Project): void => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }
};

export const deleteProject = (id: string): void => {
  const projects = getProjects();
  const filteredProjects = projects.filter((project) => project.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filteredProjects));
};

// CRUD operations for certificates
export const getCertificates = (): Certificate[] => {
  const certificates = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
  return certificates ? JSON.parse(certificates) : [];
};

export const addCertificate = (certificate: Omit<Certificate, "id">): Certificate => {
  const newCertificate = { ...certificate, id: generateId() };
  const certificates = getCertificates();
  certificates.push(newCertificate);
  localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  return newCertificate;
};

export const updateCertificate = (certificate: Certificate): void => {
  const certificates = getCertificates();
  const index = certificates.findIndex((c) => c.id === certificate.id);
  if (index !== -1) {
    certificates[index] = certificate;
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }
};

export const deleteCertificate = (id: string): void => {
  const certificates = getCertificates();
  const filteredCertificates = certificates.filter((certificate) => certificate.id !== id);
  localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(filteredCertificates));
};

// CRUD operations for tasks
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = (task: Omit<Task, "id">): Task => {
  const newTask = { ...task, id: generateId() };
  const tasks = getTasks();
  tasks.push(newTask);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  return newTask;
};

export const updateTask = (task: Task): void => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks[index] = task;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }
};

export const deleteTask = (id: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filteredTasks));
};

// CRUD operations for skills
export const getSkills = (): Skill[] => {
  const skills = localStorage.getItem(STORAGE_KEYS.SKILLS);
  return skills ? JSON.parse(skills) : [];
};

export const addSkill = (skill: Omit<Skill, "id">): Skill => {
  const newSkill = { ...skill, id: generateId() };
  const skills = getSkills();
  skills.push(newSkill);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  return newSkill;
};

export const updateSkill = (skill: Skill): void => {
  const skills = getSkills();
  const index = skills.findIndex((s) => s.id === skill.id);
  if (index !== -1) {
    skills[index] = skill;
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }
};

export const deleteSkill = (id: string): void => {
  const skills = getSkills();
  const filteredSkills = skills.filter((skill) => skill.id !== id);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(filteredSkills));
};

// CRUD operations for education
export const getEducation = (): Education[] => {
  const education = localStorage.getItem(STORAGE_KEYS.EDUCATION);
  return education ? JSON.parse(education) : [];
};

export const addEducation = (education: Omit<Education, "id">): Education => {
  const newEducation = { ...education, id: generateId() };
  const educationList = getEducation();
  educationList.push(newEducation);
  localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(educationList));
  return newEducation;
};

export const updateEducation = (education: Education): void => {
  const educationList = getEducation();
  const index = educationList.findIndex((e) => e.id === education.id);
  if (index !== -1) {
    educationList[index] = education;
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(educationList));
  }
};

export const deleteEducation = (id: string): void => {
  const educationList = getEducation();
  const filteredEducation = educationList.filter((education) => education.id !== id);
  localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(filteredEducation));
};

// CRUD operations for experience
export const getExperience = (): Experience[] => {
  const experience = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
  return experience ? JSON.parse(experience) : [];
};

export const addExperience = (experience: Omit<Experience, "id">): Experience => {
  const newExperience = { ...experience, id: generateId() };
  const experienceList = getExperience();
  experienceList.push(newExperience);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceList));
  return newExperience;
};

export const updateExperience = (experience: Experience): void => {
  const experienceList = getExperience();
  const index = experienceList.findIndex((e) => e.id === experience.id);
  if (index !== -1) {
    experienceList[index] = experience;
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceList));
  }
};

export const deleteExperience = (id: string): void => {
  const experienceList = getExperience();
  const filteredExperience = experienceList.filter((experience) => experience.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(filteredExperience));
};

// CRUD operations for feedback
export const getFeedback = (): Feedback[] => {
  const feedback = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
  return feedback ? JSON.parse(feedback) : [];
};

export const addFeedback = (feedback: Omit<Feedback, "id" | "date">): Feedback => {
  const newFeedback = { 
    ...feedback, 
    id: generateId(), 
    date: new Date().toISOString() 
  };
  const feedbackList = getFeedback();
  feedbackList.push(newFeedback);
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList));
  return newFeedback;
};

export const deleteFeedback = (id: string): void => {
  const feedbackList = getFeedback();
  const filteredFeedback = feedbackList.filter((feedback) => feedback.id !== id);
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(filteredFeedback));
};

// CRUD operations for contact
export const getContact = (): ContactInfo => {
  const contact = localStorage.getItem(STORAGE_KEYS.CONTACT);
  return contact ? JSON.parse(contact) : null;
};

export const updateContact = (contact: ContactInfo): void => {
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
};

// Admin authentication
export const verifyAdminPassword = (password: string): boolean => {
  const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === storedPassword;
};

export const updateAdminPassword = (newPassword: string): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};

export const setAdminStatus = (isAdmin: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.IS_ADMIN, isAdmin.toString());
};

export const getAdminStatus = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === "true";
};
