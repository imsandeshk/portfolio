import { supabase } from "@/integrations/supabase/client";

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

// Supabase helpers (fire-and-forget to keep current sync API)
const from = (table: string) => (supabase.from as any)(table);
const upsert = (table: string, row: any) => {
  (from(table).upsert(row) as any)
    .then(() => {
      console.log(`[Supabase] upsert into ${table} ok`);
    })
    .catch((e: any) => console.error(`[Supabase] upsert ${table} error`, e));
};

const removeById = (table: string, id: string) => {
  (from(table).delete().eq('id', id) as any)
    .then(() => {
      console.log(`[Supabase] delete from ${table} ok`);
    })
    .catch((e: any) => console.error(`[Supabase] delete ${table} error`, e));
};

// Static data (no localStorage dependency)
const profile: ProfileInfo = {
  name: "Sandesh K",
  title: "Computer Science and Engineering",
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
    platform: "Gmail",
    url: "mailto:sandeshkullolli4@gmail.com",
    icon: "Mail",
  },
  {
    id: "social4",
    platform: "LeetCode",
    url: "https://leetcode.com/u/iamsandeshk",
    icon: "ExternalLink",
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
  { id: "skill13", name: "SQL", level: 3, category: "Backend" },
];

const otherSkills: Skill[] = [
  { id: "skill11", name: "UI/UX Design", level: 5, category: "Design" },
  { id: "skill12", name: "AWS", level: 2, category: "DevOps" },
  { id: "skill14", name: "Git", level: 4, category: "Tools" },
  { id: "skill15", name: "GitHub", level: 4, category: "Tools" },
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
  // Persist to Supabase (single row with fixed id)
  upsert('site_profile', {
    id: 'main',
    name: updatedProfile.name,
    title: updatedProfile.title,
    bio: updatedProfile.bio,
    email: updatedProfile.email,
    phone: updatedProfile.phone,
    location: updatedProfile.location,
    date_of_birth: updatedProfile.dateOfBirth,
    languages: updatedProfile.languages,
    hobbies: updatedProfile.hobbies,
    profile_image: updatedProfile.profileImage,
  });
  console.log("Profile update requested:", updatedProfile);
};

export const getSocialLinks = (): SocialLink[] => {
  return socialLinks;
};

export const addSocialLink = (link: Omit<SocialLink, "id">): SocialLink => {
  const newLink = { ...link, id: generateId() };
  upsert('social_links', newLink);
  console.log("Add social link requested:", newLink);
  return newLink;
};

export const updateSocialLink = (link: SocialLink): void => {
  upsert('social_links', link);
  console.log("Update social link requested:", link);
};

export const deleteSocialLink = (id: string): void => {
  removeById('social_links', id);
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
  upsert('projects', newProject);
  console.log("Add project requested:", newProject);
  return newProject;
};

export const updateProject = (project: Project): void => {
  upsert('projects', project);
  console.log("Update project requested:", project);
};

export const deleteProject = (id: string): void => {
  removeById('projects', id);
  console.log("Delete project requested:", id);
};

export const getCertificates = (): Certificate[] => {
  return certificates;
};

export const addCertificate = (certificate: Omit<Certificate, "id">): Certificate => {
  const newCertificate = { ...certificate, id: generateId() };
  upsert('certificates', newCertificate);
  console.log("Add certificate requested:", newCertificate);
  return newCertificate;
};

export const updateCertificate = (certificate: Certificate): void => {
  upsert('certificates', certificate);
  console.log("Update certificate requested:", certificate);
};

export const deleteCertificate = (id: string): void => {
  removeById('certificates', id);
  console.log("Delete certificate requested:", id);
};

export const getTasks = (): Task[] => {
  return tasks;
};

export const addTask = (task: Omit<Task, "id">): Task => {
  const newTask = { ...task, id: generateId() };
  upsert('tasks', { ...newTask, due_date: newTask.dueDate });
  console.log("Add task requested:", newTask);
  return newTask;
};

export const updateTask = (task: Task): void => {
  upsert('tasks', { ...task, due_date: task.dueDate });
  console.log("Update task requested:", task);
};

export const deleteTask = (id: string): void => {
  removeById('tasks', id);
  console.log("Delete task requested:", id);
};

export const getSkills = (): Skill[] => {
  return skills;
};

export const addSkill = (skill: Omit<Skill, "id">): Skill => {
  const newSkill = { ...skill, id: generateId() };
  upsert('skills', skill);
  console.log("Add skill requested:", newSkill);
  return newSkill;
};

export const updateSkill = (skill: Skill): void => {
  upsert('skills', skill);
  console.log("Update skill requested:", skill);
};

export const deleteSkill = (id: string): void => {
  removeById('skills', id);
  console.log("Delete skill requested:", id);
};

export const getEducation = (): Education[] => {
  return education;
};

export const addEducation = (educationItem: Omit<Education, "id">): Education => {
  const newEducation = { ...educationItem, id: generateId() };
  upsert('education', { ...newEducation, start_date: newEducation.startDate, end_date: newEducation.endDate });
  console.log("Add education requested:", newEducation);
  return newEducation;
};

export const updateEducation = (educationItem: Education): void => {
  upsert('education', { ...educationItem, start_date: educationItem.startDate, end_date: educationItem.endDate });
  console.log("Update education requested:", educationItem);
};

export const deleteEducation = (id: string): void => {
  removeById('education', id);
  console.log("Delete education requested:", id);
};

export const getExperience = (): Experience[] => {
  return experience;
};

export const addExperience = (experienceItem: Omit<Experience, "id">): Experience => {
  const newExperience = { ...experienceItem, id: generateId() };
  upsert('experience', { ...newExperience, start_date: newExperience.startDate, end_date: newExperience.endDate });
  console.log("Add experience requested:", newExperience);
  return newExperience;
};

export const updateExperience = (experienceItem: Experience): void => {
  upsert('experience', { ...experienceItem, start_date: experienceItem.startDate, end_date: experienceItem.endDate });
  console.log("Update experience requested:", experienceItem);
};

export const deleteExperience = (id: string): void => {
  removeById('experience', id);
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
  upsert('feedback', newFeedback);
  console.log("Add feedback requested:", newFeedback);
  return newFeedback;
};

export const deleteFeedback = (id: string): void => {
  removeById('feedback', id);
  console.log("Delete feedback requested:", id);
};

export const getContact = (): ContactInfo => {
  return contact;
};

export const updateContact = (updatedContact: ContactInfo): void => {
  upsert('contact_info', { id: 'main', email: updatedContact.email, phone: updatedContact.phone, address: updatedContact.address, location: updatedContact.location });
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
