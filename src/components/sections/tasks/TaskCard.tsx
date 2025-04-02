
import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar, Edit, Trash, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import EditControls from "@/components/EditControls";

interface TaskCardProps {
  task: Task;
  isAdmin?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "planned":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="glass-card rounded-lg p-5 hover-scale card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{task.title}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className={`${getStatusColor(task.status)}`}>
              {task.status === "Completed" ? (
                <CheckCircle size={14} className="mr-1" />
              ) : (
                <Clock size={14} className="mr-1" />
              )}
              {task.status}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(task.date)}
            </Badge>
          </div>
        </div>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls 
            onEdit={() => onEdit(task)} 
            onDelete={() => onDelete(task)} 
          />
        )}
      </div>
      
      {/* Description (collapsible on mobile) */}
      {isMobile ? (
        <>
          <div 
            className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-12"}`}
          >
            <p className="text-sm text-muted-foreground mb-3">
              {task.description}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-1 w-full flex items-center justify-center"
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                Show More
              </>
            )}
          </Button>
        </>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          {task.description}
        </p>
      )}
      
      {/* Technologies */}
      {task.technologies && task.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {task.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className={isMobile ? "text-xs px-1.5 py-0.5" : ""}>
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
