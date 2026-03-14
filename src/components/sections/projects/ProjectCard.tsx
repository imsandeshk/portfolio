
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
      className="relative group rounded-[32px] overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        y: -4,
        transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
      }}
    >
      {/* Card border — frosted glass */}
      <div className="absolute inset-0 rounded-[32px] border border-white/[0.07] z-[3] pointer-events-none" />
      
      {/* Card background — frosted glass (reduced blur on mobile) */}
      <div className="absolute inset-0 rounded-[32px] bg-white/[0.03] backdrop-blur-md sm:backdrop-blur-2xl z-[1]" />
      
      <div className="relative z-[2]">
        {/* Image */}
        <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
          <motion.img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          />
          
          {/* Image gradient overlay — smoother */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Pinned indicator */}
          {project.pinned && (
            <motion.div 
              className="absolute top-3 right-3 bg-white/[0.06] backdrop-blur-xl rounded-full p-1.5 border border-white/[0.08]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star className="fill-violet-400 text-violet-400" size={12} />
            </motion.div>
          )}
          
          {/* View details overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0.9, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs md:text-sm px-4 md:px-5 py-2.5 h-auto touch-manipulation min-h-[44px] backdrop-blur-sm rounded-xl">
                <Maximize2 className="mr-1.5 h-4 w-4" />
                View Project
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="flex justify-between items-start mb-2 md:mb-3">
            <h3 className="text-base md:text-lg font-semibold text-zinc-100 truncate max-w-[80%] group-hover:text-white transition-colors duration-300">{project.title}</h3>
            
            {isAdmin && onEdit && onDelete && (
              <EditControls onEdit={onEdit} onDelete={onDelete} />
            )}
          </div>
          
          <p className="text-zinc-500 text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed hidden sm:block group-hover:text-zinc-400 transition-colors duration-300">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 hidden sm:flex">
            {project.tags && project.tags.length > 0 ? (
              <>
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-[10px] md:text-xs bg-transparent border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all duration-300 rounded-md px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="text-[10px] md:text-xs bg-transparent border-white/[0.06] text-zinc-600 rounded-md px-2 py-0.5"
                  >
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </>
            ) : null}
          </div>
          
          {/* Links */}
          <div className="flex gap-2">
            {project.url && (
              <Button 
                size="sm" 
                variant="outline" 
                asChild
                className="text-xs md:text-sm px-4 py-2 h-auto min-h-[36px] bg-violet-500/[0.08] hover:bg-violet-500/[0.15] text-violet-300 hover:text-violet-200 transition-all duration-300 border-violet-500/15 hover:border-violet-500/30 rounded-full backdrop-blur-md sm:backdrop-blur-2xl touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  <span className="hidden sm:inline">Live Demo</span>
                  <span className="sm:hidden">Live</span>
                </a>
              </Button>
            )}
            
            {project.github && (
              <Button 
                size="sm" 
                variant="outline" 
                asChild
                className="text-xs md:text-sm px-4 py-2 h-auto min-h-[36px] bg-white/[0.03] hover:bg-white/[0.05] text-zinc-500 hover:text-zinc-300 transition-all duration-300 border-white/[0.07] hover:border-white/[0.12] rounded-full backdrop-blur-md sm:backdrop-blur-2xl touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-1.5 h-3 w-3" />
                  <span className="hidden sm:inline">View Code</span>
                  <span className="sm:hidden">Code</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
