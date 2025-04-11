
import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TasksSectionProps {
  tasks: Task[];
  isAdmin?: boolean;
  onAddTask?: (task: Omit<Task, "id">) => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  isAdmin = false,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Sort tasks by due date and priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityWeight = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    
    // Finally by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Put tasks with due dates first
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return 0;
  });

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  // Handle delete task
  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Handle toggle task completion
  const handleToggleComplete = (id: string, completed: boolean) => {
    const task = tasks.find(t => t.id === id);
    if (task && onUpdateTask) {
      onUpdateTask({ ...task, completed });
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (taskToDelete && onDeleteTask) {
      onDeleteTask(taskToDelete.id);
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  // Handle save task
  const handleSaveTask = (task: Omit<Task, "id"> | Task) => {
    if ("id" in task && onUpdateTask) {
      onUpdateTask(task);
      toast({
        title: "Task updated",
        description: `"${task.title}" has been updated successfully.`,
      });
    } else if (onAddTask) {
      onAddTask(task);
      toast({
        title: "Task added",
        description: `"${task.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  // Handle add new task
  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <section id="tasks" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Tasks & Goals" 
          subtitle="Current and upcoming activities on my roadmap."
        />
        
        <motion.div
          className="flex flex-col items-center gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center w-full max-w-2xl">
            <Tabs 
              defaultValue="all" 
              className="w-full"
              value={filter}
              onValueChange={(value) => setFilter(value as "all" | "active" | "completed")}
            >
              <TabsList className="grid grid-cols-3 w-full max-w-xs mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {isAdmin && onAddTask && (
              <Button onClick={handleAddTask} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            )}
          </div>
          
          {/* Tasks List */}
          <div className="w-full max-w-2xl space-y-4">
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isAdmin={isAdmin}
                  onEdit={isAdmin ? () => handleEditTask(task) : undefined}
                  onDelete={isAdmin ? () => handleDeleteTask(task) : undefined}
                  onToggleComplete={isAdmin ? handleToggleComplete : undefined}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {filter === "all" ? "No tasks available." : `No ${filter} tasks available.`}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Task form dialog (admin view) */}
        <TaskForm
          task={taskToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveTask}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the task 
                <strong className="font-semibold">
                  {taskToDelete ? ` "${taskToDelete.title}"` : ""}
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

export default TasksSection;
