
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/services/storageService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Maximize2,
} from 'lucide-react';
import EditControls from '@/components/EditControls';

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isAdmin = false,
  onEdit,
  onDelete,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group premium-card rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        y: -6,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
    >
      {/* Image with enhanced effects */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ 
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? "brightness(0.8)" : "brightness(1)"
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Pinned indicator with enhanced animation */}
        {project.pinned && (
          <motion.div 
            className="absolute top-2 right-2 text-accent"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10,
              delay: 0.1
            }}
          >
            <Star className="fill-accent drop-shadow-glow" size={18} />
          </motion.div>
        )}
        
        {/* View details overlay with improved animation */}
        <motion.div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 1 : 0.8, 
              opacity: isHovered ? 1 : 0  
            }}
            transition={{ 
              duration: 0.3, 
              delay: isHovered ? 0.1 : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-accent hover:text-white border-white/30 text-white text-xs md:text-sm px-4 py-2 rounded-full"
            >
              <Maximize2 className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              View Project
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content with shine effect */}
      <div className="p-5 bg-gradient-to-b from-black/40 to-black/60">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base md:text-lg font-bold text-gradient truncate max-w-[80%]">
            {project.title}
          </h3>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        
        <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-4 hidden sm:block">
          {project.description}
        </p>
        
        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-1.5 mb-4 hidden sm:flex">
          {project.tags && project.tags.length > 0 ? (
            <>
              {project.tags.slice(0, 2).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-[10px] md:text-xs bg-white/5 hover:bg-white/10 transition-colors badge-glow"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 2 && (
                <Badge 
                  variant="outline" 
                  className="text-[10px] md:text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  +{project.tags.length - 2}
                </Badge>
              )}
            </>
          ) : null}
        </div>
        
        {/* Links with enhanced UI */}
        <div className="flex gap-3">
          {project.url && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-[10px] md:text-xs px-3 py-1.5 h-auto md:h-8 bg-white/5 hover:bg-accent hover:text-white transition-all duration-400 border-white/20 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
              </a>
            </Button>
          )}
          
          {project.github && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-[10px] md:text-xs px-3 py-1.5 h-auto md:h-8 bg-white/5 hover:bg-accent hover:text-white transition-all duration-400 border-white/20 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-1.5 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Source Code</span>
                <span className="sm:hidden">Code</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
