
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
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
    low: "text-blue-400",
    medium: "text-yellow-400",
    high: "text-red-400",
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
      className={`glass-card rounded-lg p-4 hover-glow ${
        task.completed ? "opacity-60" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-2">
          {isAdmin && onToggleComplete && (
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleCheckboxChange}
              className="mt-1 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
            />
          )}
          
          <div>
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through opacity-70" : ""}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className={priorityColors[task.priority]}
              >
                {task.priority} priority
              </Badge>
              
              {task.dueDate && (
                <span className="text-xs text-muted-foreground">
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      
      <p className={`text-muted-foreground text-sm mt-3 ${task.completed ? "line-through opacity-70" : ""}`}>
        {task.description}
      </p>
    </motion.div>
  );
};

export default TaskCard;
