
import { motion } from "framer-motion";
import { Project } from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Github, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import EditControls from "@/components/EditControls";

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="glass-card rounded-lg overflow-hidden hover-scale card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Star Indicator */}
        {project.featured && (
          <div className="absolute top-2 right-2">
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls 
              onEdit={() => onEdit(project)} 
              onDelete={() => onDelete(project)} 
            />
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Tags/Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className={isMobile ? "text-xs px-1.5 py-0.5" : ""}>
              {tech}
            </Badge>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.demoUrl && (
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="flex-1"
              asChild
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-1.5" />
                <span>Demo</span>
              </a>
            </Button>
          )}
          
          {project.repoUrl && (
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="flex-1"
              asChild
            >
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-1.5" />
                <span>Code</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
