
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarClock, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import EditControls from "@/components/EditControls";

interface TaskCardProps {
  task: Task;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleComplete?: (id: string, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const priorityIcons = {
    low: <div className="w-1 h-1 rounded-full bg-blue-400 mr-1"></div>,
    medium: <div className="w-1 h-1 rounded-full bg-yellow-400 mr-1"></div>,
    high: <div className="w-1 h-1 rounded-full bg-red-400 mr-1"></div>,
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (onToggleComplete) {
      onToggleComplete(task.id, checked);
    }
  };

  return (
    <motion.div
      className={`glass-card rounded-xl overflow-hidden p-4 sm:p-5 card-hover-3d h-full ${task.completed ? "border-l-4 border-l-green-500/50 opacity-60" : `border-l-4 border-l-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'blue'}-500/50`}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2 sm:gap-3">
          {isAdmin && onToggleComplete && (
            <div className="mt-0.5">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleCheckboxChange}
                className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              />
            </div>
          )}
          
          <div>
            <motion.h3 
              className={`text-base sm:text-lg font-semibold ${task.completed ? "line-through opacity-70 text-muted-foreground" : "text-gradient"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {task.title}
            </motion.h3>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${priorityColors[task.priority]} px-1.5 sm:px-2 py-0 sm:py-0.5 flex items-center badge-glow`}
              >
                {priorityIcons[task.priority]}
                {task.priority}
              </Badge>
              
              {task.dueDate && (
                <span className={`text-xs text-muted-foreground flex items-center gap-1 ${task.completed ? "line-through" : ""}`}>
                  <Clock size={12} className="opacity-70" />
                  {formatDate(task.dueDate)}
                </span>
              )}
              
              {task.completed && (
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-1.5 sm:px-2 py-0 sm:py-0.5 flex items-center gap-1 badge-glow">
                  <CheckCircle2 size={12} />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      
      <motion.p 
        className={`text-xs sm:text-sm text-muted-foreground mt-3 ml-5 sm:ml-8 ${task.completed ? "line-through opacity-70" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {task.description}
      </motion.p>
    </motion.div>
  );
};

export default TaskCard;
