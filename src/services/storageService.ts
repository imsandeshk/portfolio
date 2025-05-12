
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
  dateOfBirth?: string;
  languages?: string[];
  hobbies?: string[];
  profileImage: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  location?: string;
}

// Helper function to generate IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Static data (no localStorage dependency)
const profile: ProfileInfo = {
  name: "Sandesh K",
  title: "Computer Science Student",
  bio: "Passionate about web development and UI/UX design.",
  email: "sandeshkullolli4@gmail.com",
  location: "Raghuvanahalli, Bangalore - 590109",
  dateOfBirth: "19 July 2004",
  languages: ["Kannada", "Hindi", "English"],
  hobbies: ["Anime", "Making Concepts", "Gaming sometimes"],
  profileImage: "/lovable-uploads/6f0800b3-624d-42cd-9762-3cbe10931da5.png",
};

const socialLinks: SocialLink[] = [
  {
    id: "social1",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/sandesh-kullolli-155b92259",
    icon: "Linkedin",
  },
  {
    id: "social2",
    platform: "GitHub",
    url: "https://github.com/iamsandeshk",
    icon: "Github",
  },
  {
    id: "social3",
    platform: "YouTube",
    url: "https://youtube.com/@TheOneUI?si=dGSPvu14BSPC1Pi_",
    icon: "Youtube",
  },
  {
    id: "social4",
    platform: "Twitter",
    url: "https://x.com/The1UX?t=rtFCxTr86h5JHVm9tc-jqg&s=09",
    icon: "Twitter",
  },
];

const projects: Project[] = [
  {
    id: "project1",
    title: "Hostel Booking System",
    description: "Hostel booking website for tourists to book rooms with pricing info.",
    image: "/projects/Hostel-booking.png",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://iamsandeshk.github.io/HotelBokking/",
    github: "https://github.com/iamsandeshk/HotelBokking.git",
    pinned: true,
  },
  {
    id: "project2",
    title: "Stop Watch",
    description: "Stopwatch with start, pause, lap, and reset features.",
    image: "/projects/Stopwatch.png",
    category: "Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://iamsandeshk.github.io/Stopwatch1/",
    github: "https://github.com/iamsandeshk/Stopwatch1.git",
    pinned: true,
  },
  {
    id: "project3",
    title: "Bus Booking",
    description: "Bus seat/sleeper selection with pricing.",
    image: "/projects/Bus-booking.png",
    category: "Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://iamsandeshk.github.io/bus-booking/",
    github: "https://github.com/iamsandeshk/bus-booking.git",
    pinned: false,
  },
  {
    id: "project4",
    title: "Vexora-Anime",
    description: "Anime site for episode countdown and trailers.",
    image: "/projects/Vexora-Anime.png",
    category: "Web App",
    tags: ["TypeScript", "CSS"],
    url: "https://vexoanime.netlify.app",
    github: "https://github.com/iamsandeshk/Vaxora-Anime.git",
    pinned: false,
  },
  {
    id: "project5",
    title: "Movie Bot",
    description: "A chatbot that suggests movies.",
    image: "/projects/Moviebot.png",
    category: "Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://iamsandeshk.github.io/MovieBot/",
    github: "https://github.com/iamsandeshk/MovieBot.git",
    pinned: false,
  }
];

const certificates: Certificate[] = [
  {
    id: "cert1",
    image:"/certificates/internpe.png",
    title: "AI/ML Internship",
    issuer: "InternPe",
    date: "2025-03-16",
  },
  {
    id: "cert2",
    image:"/certificates/Corizo.jpg",
    title: "Internship at Corizo",
    issuer: "Corizo",
    date: "2024-07-30",
  },
];

const tasks: Task[] = [
  {
    id: "task1",
    title: "Update the design of Portfolio website",
    description: "Redesign and improve portfolio website UI/UX",
    completed: true,
    dueDate: "2025-07-19",
    priority: "medium",
  },
  {
    id: "task2",
    title: "AI Interview Assistant",
    description: "Develop an AI-based interview assistant tool",
    completed: false,
    dueDate: "2025-11-20",
    priority: "high",
  },
  {
    id: "task3",
    title: "Learn Backend Node.js and PHP",
    description: "Complete courses and build projects with Node.js and PHP",
    completed: false,
    dueDate: "2025-09-20",
    priority: "medium",
  }
];

// Skills categorized
const frontendSkills: Skill[] = [
  { id: "skill1", name: "HTML", level: 5, category: "Frontend" },
  { id: "skill2", name: "CSS", level: 3, category: "Frontend" },
  { id: "skill3", name: "JavaScript", level: 2, category: "Frontend" },
  { id: "skill4", name: "React", level: 1, category: "Frontend" },
  { id: "skill5", name: "TypeScript", level: 1, category: "Frontend" },
];

const backendSkills: Skill[] = [
  { id: "skill6", name: "Node.js", level: 3, category: "Backend" },
  { id: "skill7", name: "Java", level: 2, category: "Backend" },
  { id: "skill8", name: "C", level: 4, category: "Backend" },
  { id: "skill9", name: "Python", level: 4, category: "Backend" },
  { id: "skill10", name: "MongoDB", level: 3, category: "Backend" },
];

const otherSkills: Skill[] = [
  { id: "skill11", name: "UI/UX Design", level: 5, category: "Design" },
  { id: "skill12", name: "AWS", level: 2, category: "DevOps" },
];

const skills: Skill[] = [
  ...frontendSkills,
  ...backendSkills,
  ...otherSkills
];

const education: Education[] = [
  {
    id: "edu1",
    institution: "K S INSTITUTE OF TECHNOLOGY",
    degree: "B.E",
    field: "Computer Science and Engineering",
    startDate: "2022-11-01",
    endDate: "2026-07-30",
    description: "Studied computer architecture, software development, and mathematics.",
  }
];

const experience: Experience[] = []; // No experience provided

const contact: ContactInfo = {
  email: "sandeshkullolli4@gmail.com",
  location: "Raghuvanahalli, Bangalore - 590109",
};

// CRUD operations but with static data (no localStorage)
export const getProfile = (): ProfileInfo => {
  return profile;
};

export const updateProfile = (updatedProfile: ProfileInfo): void => {
  // In a real app, this would update the database
  console.log("Profile update requested:", updatedProfile);
};

export const getSocialLinks = (): SocialLink[] => {
  return socialLinks;
};

export const addSocialLink = (link: Omit<SocialLink, "id">): SocialLink => {
  const newLink = { ...link, id: generateId() };
  console.log("Add social link requested:", newLink);
  return newLink;
};

export const updateSocialLink = (link: SocialLink): void => {
  console.log("Update social link requested:", link);
};

export const deleteSocialLink = (id: string): void => {
  console.log("Delete social link requested:", id);
};

export const getProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const addProject = (project: Omit<Project, "id">): Project => {
  const newProject = { ...project, id: generateId() };
  console.log("Add project requested:", newProject);
  return newProject;
};

export const updateProject = (project: Project): void => {
  console.log("Update project requested:", project);
};

export const deleteProject = (id: string): void => {
  console.log("Delete project requested:", id);
};

export const getCertificates = (): Certificate[] => {
  return certificates;
};

export const addCertificate = (certificate: Omit<Certificate, "id">): Certificate => {
  const newCertificate = { ...certificate, id: generateId() };
  console.log("Add certificate requested:", newCertificate);
  return newCertificate;
};

export const updateCertificate = (certificate: Certificate): void => {
  console.log("Update certificate requested:", certificate);
};

export const deleteCertificate = (id: string): void => {
  console.log("Delete certificate requested:", id);
};

export const getTasks = (): Task[] => {
  return tasks;
};

export const addTask = (task: Omit<Task, "id">): Task => {
  const newTask = { ...task, id: generateId() };
  console.log("Add task requested:", newTask);
  return newTask;
};

export const updateTask = (task: Task): void => {
  console.log("Update task requested:", task);
};

export const deleteTask = (id: string): void => {
  console.log("Delete task requested:", id);
};

export const getSkills = (): Skill[] => {
  return skills;
};

export const addSkill = (skill: Omit<Skill, "id">): Skill => {
  const newSkill = { ...skill, id: generateId() };
  console.log("Add skill requested:", newSkill);
  return newSkill;
};

export const updateSkill = (skill: Skill): void => {
  console.log("Update skill requested:", skill);
};

export const deleteSkill = (id: string): void => {
  console.log("Delete skill requested:", id);
};

export const getEducation = (): Education[] => {
  return education;
};

export const addEducation = (educationItem: Omit<Education, "id">): Education => {
  const newEducation = { ...educationItem, id: generateId() };
  console.log("Add education requested:", newEducation);
  return newEducation;
};

export const updateEducation = (educationItem: Education): void => {
  console.log("Update education requested:", educationItem);
};

export const deleteEducation = (id: string): void => {
  console.log("Delete education requested:", id);
};

export const getExperience = (): Experience[] => {
  return experience;
};

export const addExperience = (experienceItem: Omit<Experience, "id">): Experience => {
  const newExperience = { ...experienceItem, id: generateId() };
  console.log("Add experience requested:", newExperience);
  return newExperience;
};

export const updateExperience = (experienceItem: Experience): void => {
  console.log("Update experience requested:", experienceItem);
};

export const deleteExperience = (id: string): void => {
  console.log("Delete experience requested:", id);
};

export const getFeedback = (): Feedback[] => {
  return [];
};

export const addFeedback = (feedback: Omit<Feedback, "id" | "date">): Feedback => {
  const newFeedback = { 
    ...feedback, 
    id: generateId(), 
    date: new Date().toISOString() 
  };
  console.log("Add feedback requested:", newFeedback);
  return newFeedback;
};

export const deleteFeedback = (id: string): void => {
  console.log("Delete feedback requested:", id);
};

export const getContact = (): ContactInfo => {
  return contact;
};

export const updateContact = (updatedContact: ContactInfo): void => {
  console.log("Contact update requested:", updatedContact);
};

// Admin authentication - simplified version without localStorage
export const verifyAdminPassword = (password: string): boolean => {
  return password === "@#Sandesh58"; // Hardcoded password as in the original code
};

export const updateAdminPassword = (newPassword: string): void => {
  console.log("Admin password update requested:", newPassword);
};

export const setAdminStatus = (isAdmin: boolean): void => {
  console.log("Admin status change requested:", isAdmin);
};

export const getAdminStatus = (): boolean => {
  return true; // Always return true for demo purposes
};
