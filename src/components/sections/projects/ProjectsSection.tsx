
import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectForm from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin?: boolean;
  onAddProject?: (project: Omit<Project, "id">) => void;
  onUpdateProject?: (project: Project) => void;
  onDeleteProject?: (id: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isAdmin = false,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Get a list of unique categories
  const categories = Array.from(new Set(projects.map(project => project.category)));

  // Handle project card click
  const handleProjectClick = (project: Project) => {
    if (!isAdmin) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  // Handle edit project
  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsFormOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (projectToDelete && onDeleteProject) {
      onDeleteProject(projectToDelete.id);
      toast({
        title: "Project deleted",
        description: `"${projectToDelete.title}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // Handle save project
  const handleSaveProject = (project: Omit<Project, "id"> | Project) => {
    if ("id" in project && onUpdateProject) {
      onUpdateProject(project);
      toast({
        title: "Project updated",
        description: `"${project.title}" has been updated successfully.`,
      });
    } else if (onAddProject) {
      onAddProject(project);
      toast({
        title: "Project added",
        description: `"${project.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setProjectToEdit(null);
  };

  // Handle add new project
  const handleAddProject = () => {
    setProjectToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <section id="projects" className="py-16 min-h-screen">
      <div className="container mx-auto">
        <SectionHeading 
          title="Projects" 
          subtitle="Check out some of the projects I've worked on."
        />
        
        {isAdmin && onAddProject && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </motion.div>
        )}
        
        {/* Projects Grid - Updated to maintain 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <ProjectCard
                project={project}
                isAdmin={isAdmin}
                onEdit={isAdmin ? () => handleEditProject(project) : undefined}
                onDelete={isAdmin ? () => handleDeleteProject(project) : undefined}
                onClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Project details modal (non-admin view) */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        
        {/* Project form dialog (admin view) */}
        <ProjectForm
          project={projectToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProject}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the project 
                <strong className="font-semibold">
                  {projectToDelete ? ` "${projectToDelete.title}"` : ""}
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

export default ProjectsSection;
