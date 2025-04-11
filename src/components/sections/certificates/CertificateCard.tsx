
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import { ExternalLink, Award, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import EditControls from "@/components/EditControls";

interface CertificateCardProps {
  certificate: Certificate;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden card-hover-3d h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px rgba(255, 87, 51, 0.2)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start gap-3">
            <div className="bg-accent/20 p-2.5 rounded-full glow-accent">
              <Award className="text-accent drop-shadow-glow" size={18} />
            </div>
            <div>
              <motion.h3 
                className="text-lg font-semibold text-gradient mb-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {certificate.title}
              </motion.h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 flex flex-wrap items-center gap-1">
                <span>{certificate.issuer}</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="opacity-70" />
                  {formatDate(certificate.date)}
                </span>
              </p>
            </div>
          </div>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        
        {certificate.url && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-4 ml-0 sm:ml-11 mt-auto pt-2"
          >
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20 badge-glow w-full sm:w-auto"
            >
              <a 
                href={certificate.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                View Certificate
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;
