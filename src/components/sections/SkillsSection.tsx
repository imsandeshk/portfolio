
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
import { Copy, Edit, Figma, Framer, LayoutGrid, Plus, Trash } from "lucide-react";
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
  onDeleteSkill
}) => {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(3);
  const { toast } = useToast();

  // Handle edit skill
  const handleEditSkill = (skill: Skill) => {
    setSkillToEdit(skill);
    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level);
    setIsFormOpen(true);
  };

  // Handle delete skill
  const handleDeleteSkill = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (skillToDelete && onDeleteSkill) {
      onDeleteSkill(skillToDelete.id);
      toast({
        title: "Skill deleted",
        description: `"${skillToDelete.name}" has been deleted successfully.`
      });
    }
    setIsDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  // Handle save skill
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkill = {
      ...(skillToEdit && {
        id: skillToEdit.id
      }),
      name,
      category,
      level
    };
    if (skillToEdit && onUpdateSkill) {
      onUpdateSkill(updatedSkill as Skill);
      toast({
        title: "Skill updated",
        description: `"${name}" has been updated successfully.`
      });
    } else if (onAddSkill) {
      onAddSkill(updatedSkill);
      toast({
        title: "Skill added",
        description: `"${name}" has been added successfully.`
      });
    }
    setIsFormOpen(false);
    resetForm();
  };

  // Handle add new skill
  const handleAddSkill = () => {
    resetForm();
    setIsFormOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setSkillToEdit(null);
    setName("");
    setCategory("");
    setLevel(3);
  };

  // Get icon for skill
  const getSkillIcon = (skillName: string) => {
    const name = skillName.toLowerCase();
    
    if (name.includes("ui") || name.includes("ux") || name.includes("design")) {
      return <Copy className="h-8 w-8" />;
    } else if (name.includes("web") || name.includes("html") || name.includes("css")) {
      return <LayoutGrid className="h-8 w-8" />;
    } else if (name.includes("framer") || name.includes("motion")) {
      return <Framer className="h-8 w-8" />;
    } else if (name.includes("photo") || name.includes("shop") || name.includes("design")) {
      return <Figma className="h-8 w-8" />;
    }
    
    // Default icon
    return <LayoutGrid className="h-8 w-8" />;
  };

  // Get color for skill level bar based on theme
  const getSkillLevelColor = (level: number): string => {
    if (level >= 4.5) return "bg-blue-500";
    if (level >= 3.5) return "bg-blue-400";
    if (level >= 2.5) return "bg-blue-300";
    return "bg-blue-200";
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
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </motion.div>
        )}
        
        {/* Skills grid - new design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm p-5 border border-white/10"
            >
              <div className="flex flex-col items-center">
                {/* Skill icon */}
                <div className="bg-gray-800/70 rounded-lg p-3 mb-4">
                  {getSkillIcon(skill.name)}
                </div>
                
                {/* Skill name */}
                <h3 className="text-lg font-medium text-center mb-3">{skill.name}</h3>
                
                {/* Skill level bar */}
                <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getSkillLevelColor(skill.level)}`} 
                    style={{ width: `${skill.level / 5 * 100}%` }}
                  />
                </div>
                
                {/* Admin controls */}
                {isAdmin && onUpdateSkill && onDeleteSkill && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEditSkill(skill)}>
                      <Edit size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDeleteSkill(skill)}>
                      <Trash size={14} />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Skill form dialog (admin view) */}
        <Dialog 
          open={isFormOpen} 
          onOpenChange={open => {
            setIsFormOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {skillToEdit ? "Edit Skill" : "Add New Skill"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Enter skill name" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    placeholder="E.g., Frontend, Backend, DevOps, etc." 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="level">Proficiency Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {getLevelText(level)}
                    </span>
                  </div>
                  <Slider 
                    id="level" 
                    value={[level]} 
                    min={1} 
                    max={5} 
                    step={1} 
                    onValueChange={value => setLevel(value[0])} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Skill</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the skill 
                <strong className="font-semibold">
                  {skillToDelete ? ` "${skillToDelete.name}"` : ""}
                </strong>. 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDelete} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

// Helper function to get text representation of level
const getLevelText = (level: number): string => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Basic";
    case 3:
      return "Intermediate";
    case 4:
      return "Advanced";
    case 5:
      return "Expert";
    default:
      return "Intermediate";
  }
};

export default SkillsSection;
