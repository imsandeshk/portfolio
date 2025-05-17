
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useTheme } from "@/contexts/ThemeContext";

const interests = [
  "Web Development",
  "UI/UX Design",
  "Mobile App Development",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Open Source",
  "Blockchain",
  "Artificial Intelligence",
  "Cybersecurity",
  "Data Science",
  "IoT",
  "Augmented Reality",
  "Game Development",
  "Robotics",
];

const InterestsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="interests" className="py-16 md:py-20">
      <div className="container mx-auto">
        <SectionHeading
          title="Interests & Hobbies"
          subtitle="Tech areas and activities I'm passionate about."
        />

        <div className="mt-8 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm md:text-base mb-6 text-pretty">
                  Beyond coding, I have diverse interests that fuel my creativity and keep me inspired.
                </p>

                <div className="space-y-6">
                  <div className="overflow-hidden">
                    <div className="infinite-scroll-container-left relative py-2">
                      <div className="flex gap-3 items-center absolute left-0 w-max">
                        {[...interests, ...interests].map((interest, index) => (
                          <motion.div
                            key={`${interest}-${index}`}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap ${
                              isDark
                                ? "bg-white/5 backdrop-blur-sm border border-white/10 text-white/90"
                                : "bg-light-secondary/90 backdrop-blur-sm border border-white/5 text-white"
                            } transition-all duration-300 hover:scale-105`}
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 5px 15px rgba(0,0,0,0.1)" 
                            }}
                          >
                            {interest}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <div className="infinite-scroll-container-right relative py-2">
                      <div className="flex gap-3 items-center absolute right-0 w-max">
                        {[...interests.reverse(), ...interests.reverse()].map((interest, index) => (
                          <motion.div
                            key={`${interest}-${index}-rev`}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap ${
                              isDark
                                ? "bg-white/5 backdrop-blur-sm border border-white/10 text-white/90"
                                : "bg-light-secondary/90 backdrop-blur-sm border border-white/5 text-white"
                            } transition-all duration-300 hover:scale-105`}
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 5px 15px rgba(0,0,0,0.1)" 
                            }}
                          >
                            {interest}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.p
                    className="text-sm italic text-center text-white/70"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    "Learning is a journey that never ends. I embrace new technologies and concepts with curiosity and enthusiasm."
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>
        {`
        .infinite-scroll-container-left {
          overflow: hidden;
        }
        .infinite-scroll-container-left > div {
          animation: infiniteScrollLeft 20s linear infinite;
          width: fit-content;
        }
        
        .infinite-scroll-container-right {
          overflow: hidden;
        }
        .infinite-scroll-container-right > div {
          animation: infiniteScrollRight 20s linear infinite;
          width: fit-content;
        }
        
        @keyframes infiniteScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes infiniteScrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }
        
        @media (max-width: 640px) {
          .infinite-scroll-container-left > div {
            animation-duration: 15s;
          }
          
          .infinite-scroll-container-right > div {
            animation-duration: 15s;
          }
        }
        `}
      </style>
    </section>
  );
};

export default InterestsSection;
