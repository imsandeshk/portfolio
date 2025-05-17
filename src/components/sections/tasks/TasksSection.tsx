
import { useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import { Task } from "@/services/storageService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface TasksSectionProps {
  tasks: Task[];
  isAdmin?: boolean;
  onOpenTaskForm?: (task?: Task) => void;
  onDeleteTask?: (task: Task) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  isAdmin = false,
  onOpenTaskForm,
  onDeleteTask,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const allTasks = [...tasks].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  
  const inProgressTasks = allTasks.filter((task) => !task.completed);
  const completedTasks = allTasks.filter((task) => task.completed);

  return (
    <section>
      <div>
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700">
            Tasks & Goals
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Current and upcoming activities on my roadmap.
          </p>
        </div>

        <motion.div 
          className="mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-3 max-w-md mx-auto ${
              isDark 
                ? 'backdrop-blur-md bg-black/40 border-white/10' 
                : 'backdrop-blur-md bg-light-dark/90 border-light-secondary/30'
              } rounded-xl border shadow-md overflow-hidden`}>
              <TabsTrigger 
                value="all" 
                className={`text-sm py-3 data-[state=active]:text-white data-[state=active]:shadow-none ${
                  isDark
                    ? 'data-[state=active]:bg-white/10 text-white/70 hover:text-white'
                    : 'data-[state=active]:bg-light-secondary text-gray-300 hover:text-white'
                }`}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="in-progress" 
                className={`text-sm py-3 data-[state=active]:text-white data-[state=active]:shadow-none ${
                  isDark
                    ? 'data-[state=active]:bg-white/10 text-white/70 hover:text-white'
                    : 'data-[state=active]:bg-light-secondary text-gray-300 hover:text-white'
                }`}
              >
                <Clock className="mr-1 w-4 h-4" />
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className={`text-sm py-3 data-[state=active]:text-white data-[state=active]:shadow-none ${
                  isDark
                    ? 'data-[state=active]:bg-white/10 text-white/70 hover:text-white'
                    : 'data-[state=active]:bg-light-secondary text-gray-300 hover:text-white'
                }`}
              >
                <CheckCircle2 className="mr-1 w-4 h-4" />
                Completed
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="all" className="m-0">
                {allTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                    {allTasks.map((task, index) => (
                      <TaskCard
                        key={task.id || index}
                        task={task}
                        isAdmin={isAdmin}
                        onEdit={onOpenTaskForm ? () => onOpenTaskForm(task) : undefined}
                        onDelete={onDeleteTask ? () => onDeleteTask(task) : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 text-muted-foreground">
                    <p>No tasks found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="in-progress" className="m-0">
                {inProgressTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                    {inProgressTasks.map((task, index) => (
                      <TaskCard
                        key={task.id || index}
                        task={task}
                        isAdmin={isAdmin}
                        onEdit={onOpenTaskForm ? () => onOpenTaskForm(task) : undefined}
                        onDelete={onDeleteTask ? () => onDeleteTask(task) : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 text-muted-foreground">
                    <p>No tasks in progress</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="m-0">
                {completedTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                    {completedTasks.map((task, index) => (
                      <TaskCard
                        key={task.id || index}
                        task={task}
                        isAdmin={isAdmin}
                        onEdit={onOpenTaskForm ? () => onOpenTaskForm(task) : undefined}
                        onDelete={onDeleteTask ? () => onDeleteTask(task) : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 text-muted-foreground">
                    <p>No completed tasks</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default TasksSection;
