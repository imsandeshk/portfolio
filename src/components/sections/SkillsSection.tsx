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
  onDeleteSkill
}) => {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(3);
  const {
    toast
  } = useToast();

  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

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
  return <section id="skills" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="My technical expertise and proficiency levels." />
        
        {isAdmin && onAddSkill && <motion.div className="flex justify-center mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </motion.div>}
        
        {/* Skills by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {categories.map(category => {
          const categorySkills = skills.filter(skill => skill.category === category);
          return <motion.div key={category} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} viewport={{
            once: true,
            margin: "-50px"
          }} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-gradient">{category}</h3>
                
                <div className="space-y-4">
                  {categorySkills.map(skill => <div key={skill.id} className="relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {getLevelText(skill.level)}
                        </span>
                      </div>
                      
                      <div className="h-2 bg-secondary rounded overflow-hidden">
                        <div className="h-full bg-accent" style={{
                    width: `${skill.level / 5 * 100}%`
                  }}></div>
                      </div>
                      
                      {isAdmin && onUpdateSkill && onDeleteSkill && <div className="absolute -right-2 -top-2 flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEditSkill(skill)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDeleteSkill(skill)}>
                            <Trash size={14} />
                          </Button>
                        </div>}
                    </div>)}
                </div>
              </motion.div>;
        })}
        </div>
        
        {/* Skill form dialog (admin view) */}
        <Dialog open={isFormOpen} onOpenChange={open => {
        setIsFormOpen(open);
        if (!open) resetForm();
      }}>
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
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter skill name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="E.g., Frontend, Backend, DevOps, etc." required />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="level">Proficiency Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {getLevelText(level)}
                    </span>
                  </div>
                  <Slider id="level" value={[level]} min={1} max={5} step={1} onValueChange={value => setLevel(value[0])} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                setIsFormOpen(false);
                resetForm();
              }}>
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
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>;
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