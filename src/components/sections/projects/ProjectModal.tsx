import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { 
  ExternalLink, 
  Github, 
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/services/storageService";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl overflow-hidden bg-card/95 backdrop-blur-md border border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            {project.title}
            {project.pinned && (
              <Star className="ml-2 fill-accent text-accent" size={18} />
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="relative w-full h-64 overflow-hidden rounded-md mb-4">
            <img 
              src={project.image || "/placeholder.svg"} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">{project.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.url && (
                <Button asChild>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Project
                  </a>
                </Button>
              )}
              
              {project.github && (
                <Button variant="outline" asChild>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
