
import { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SkillsSectionProps {
  skills: Skill[];
  isAdmin?: boolean;
  onAddSkill?: (skill: Omit<Skill, "id">) => void;
  onUpdateSkill?: (skill: Skill) => void;
  onDeleteSkill?: (id: string) => void;
}

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
  const { toast } = useToast();

  const getIconUrl = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes("ui") || name.includes("ux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
    if (name.includes("aws")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
    if (name.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
    if (name.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (name.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
  };

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

  // Animation variants
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
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="My technical expertise" />

        {isAdmin && onAddSkill && (
          <motion.div 
            className="flex justify-center mb-8" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </motion.div>
        )}

        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              whileHover="hover"
              className="flex items-center gap-2 rounded-full px-4 py-2 bg-black/50 border border-white/10 backdrop-blur text-white text-sm font-medium"
            >
              <img src={getIconUrl(skill.name)} alt={skill.name} className="w-6 h-6 object-contain" />
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
