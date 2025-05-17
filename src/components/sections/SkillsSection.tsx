
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Skill } from "@/services/storageService";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillsSectionProps {
  skills: Skill[];
  isAdmin?: boolean;
  onOpenSkillForm?: (skill?: Skill) => void;
  onDeleteSkill?: (skill: Skill) => void;
  onAddSkill?: (skill: any) => void;
  onUpdateSkill?: (skill: any) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin = false,
  onOpenSkillForm,
  onDeleteSkill,
  onAddSkill,
  onUpdateSkill,
}) => {
  // Process skills by category
  const skillsByCategory: Record<string, Skill[]> = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  // Sort categories by total skill level
  const categories = Object.keys(skillsByCategory).sort((a, b) => {
    const totalA = skillsByCategory[a].reduce(
      (sum, skill) => sum + skill.level,
      0
    );
    const totalB = skillsByCategory[b].reduce(
      (sum, skill) => sum + skill.level,
      0
    );
    return totalB - totalA;
  });

  const getSkillLevelLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="container mx-auto">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I specialize in."
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10"
            >
              <h3 className={`text-xl md:text-2xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-[#1A1F2C]'
              }`}>
                {category}
              </h3>

              <div className="space-y-6">
                {skillsByCategory[category].map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="stagger-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: skillIndex * 0.1 + categoryIndex * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            {/* Make the icon property optional with ? operator */}
                            {skill.icon && (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-5 h-5"
                              />
                            )}
                            <h4 className={`font-medium ${
                              isDark ? 'text-white' : 'text-[#1A1F2C]'
                            }`}>
                              {skill.name}
                            </h4>
                          </div>
                          <span className={`text-xs ${
                            isDark ? 'text-white/70' : 'text-[#1A1F2C]/70'
                          }`}>
                            {getSkillLevelLabel(skill.level)}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200/10 rounded-full overflow-hidden">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              isDark ? "bg-accent" : "bg-[#7E69AB]"
                            )}
                            initial={{ width: "0%" }}
                            whileInView={{
                              width: `${skill.level}%`,
                            }}
                            transition={{
                              duration: 1,
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.2,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
