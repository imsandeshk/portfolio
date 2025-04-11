
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
      className="glass-card rounded-xl p-5 hover-glow border-l-4 border-l-accent"
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
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3">
          <div className="bg-accent/20 p-2 rounded-full mt-1">
            <Award className="text-accent" size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gradient">{certificate.title}</h3>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
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
          className="mt-4 ml-11"
        >
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
          >
            <a 
              href={certificate.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              View Certificate
            </a>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CertificateCard;
