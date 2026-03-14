import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Skill } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillsSectionProps {
  skills: Skill[];
  isAdmin?: boolean;
  onAddSkill?: (skill: Omit<Skill, "id">) => void;
  onUpdateSkill?: (skill: Skill) => void;
  onDeleteSkill?: (id: string) => void;
}

const softSkillNames = [
  "problem solving",
  "leadership",
  "team work",
  "communication",
  "flexibility",
  "adaptability",
];

const softSkillIcons: Record<string, React.ReactNode> = {
  "problem solving": <span title="Problem Solving" className="w-6 h-6 flex items-center justify-center">💡</span>,
  "leadership": <span title="Leadership" className="w-6 h-6 flex items-center justify-center">🧑‍💼</span>,
  "team work": <span title="Team Work" className="w-6 h-6 flex items-center justify-center">🤝</span>,
  "communication": <span title="Communication" className="w-6 h-6 flex items-center justify-center">💬</span>,
  "flexibility": <span title="Flexibility" className="w-6 h-6 flex items-center justify-center">🔄</span>,
  "adaptability": <span title="Adaptability" className="w-6 h-6 flex items-center justify-center">🌱</span>,
};

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin = false,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const getIconUrl = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("ui") || name.includes("ux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
    if (name.includes("aws")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
    if (name.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
    if (name.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (name.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    if (name.includes("sql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg";
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.03,
      borderColor: "rgba(139, 92, 246, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  // Handle admin actions
  const handleEditSkill = (skill: Skill) => {
    setSkillToEdit(skill);
    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level);
    setIsFormOpen(true);
  };

  const handleDeleteSkill = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete && onDeleteSkill) {
      onDeleteSkill(skillToDelete.id);
      toast({ title: "Skill deleted", description: `"${skillToDelete.name}" has been deleted successfully.` });
    }
    setIsDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkill = {
      ...(skillToEdit && { id: skillToEdit.id }),
      name,
      category,
      level,
    };
    if (skillToEdit && onUpdateSkill) {
      onUpdateSkill(updatedSkill as Skill);
      toast({ title: "Skill updated", description: `"${name}" has been updated successfully.` });
    } else if (onAddSkill) {
      onAddSkill(updatedSkill);
      toast({ title: "Skill added", description: `"${name}" has been added successfully.` });
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleAddSkill = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setSkillToEdit(null);
    setName("");
    setCategory("");
    setLevel(3);
  };

  // Split skills into technical and soft skills
  const technicalSkills = skills.filter(
    (skill) => !softSkillNames.includes(skill.name.toLowerCase())
  );
  const softSkills = skills.filter(
    (skill) => softSkillNames.includes(skill.name.toLowerCase())
  );

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Tools I Use" subtitle="Technologies and frameworks I work with" />

        {isAdmin && onAddSkill && (
          <motion.div 
            className="flex justify-center mb-8" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" /> Add Tool
            </Button>
          </motion.div>
        )}
      </div>

      {/* Full-width container - no padding on mobile, with fade on desktop */}
      <div className="w-full relative">
        {/* Subtle fade edges - desktop only */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-32 z-10 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to right, rgba(1,1,1,0.95) 0%, transparent 100%)'
          }}
        />
        <div className="hidden md:block absolute right-0 top-0 h-full w-32 z-10 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to left, rgba(1,1,1,0.95) 0%, transparent 100%)'
          }}
        />
        
        <motion.div 
          className="flex flex-wrap gap-2 md:gap-4 justify-center px-0 md:px-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Render technical skills */}
          {technicalSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              whileHover="hover"
              className="group relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-white text-sm font-medium cursor-default border border-white/[0.07] hover:border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-2xl transition-all duration-300"
            >
              <img src={getIconUrl(skill.name)} alt={skill.name} loading="lazy" decoding="async" className="w-4.5 h-4.5 object-contain" style={{ width: '18px', height: '18px' }} />
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 text-[13px]">{skill.name}</span>
            </motion.div>
          ))}

          {/* "more..." pill for soft skills */}
          {!showMore && softSkills.length > 0 && (
            <motion.div
              variants={skillVariants}
              whileHover="hover"
              className="group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium cursor-pointer border border-violet-500/15 bg-violet-500/[0.04] hover:bg-violet-500/[0.08] hover:border-violet-500/25 backdrop-blur-2xl transition-all duration-300"
              onClick={() => setShowMore(true)}
            >
              <span title="More" className="w-4 h-4 flex items-center justify-center text-xs">⭐</span>
              <span className="text-violet-400 group-hover:text-violet-300 transition-colors text-[13px]">more...</span>
            </motion.div>
          )}
        </motion.div>

        {/* Reveal soft skills when showMore is true */}
        {showMore && (
          <motion.div 
            className="flex flex-wrap gap-2 md:gap-4 justify-center mt-4 px-0 md:px-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {softSkills.map((skill) => {
              const name = skill.name.toLowerCase();
              return (
                <motion.div
                  key={skill.id}
                  variants={skillVariants}
                  whileHover="hover"
                  className="group flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium cursor-default border border-white/[0.07] hover:border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-2xl transition-all duration-300"
                >
                  <span>{softSkillIcons[name]}</span>
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 text-[13px]">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        
      </div>
      
      {/* Dialog forms for admin actions - moved inside container */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{skillToEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription>
              {skillToEdit ? "Update your skill details and proficiency level." : "Add a new skill with your proficiency level."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveSkill}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level
                </Label>
                <Slider
                  id="level"
                  defaultValue={[level]}
                  max={5}
                  step={1}
                  onValueChange={(value) => setLevel(value[0])}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {skillToEdit ? "Update Skill" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete <span className="font-medium">"{skillToDelete?.name}"</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </section>
  );
};

export default SkillsSection;
