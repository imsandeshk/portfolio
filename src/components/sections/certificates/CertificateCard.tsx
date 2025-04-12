
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
  index?: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isAdmin = false,
  onEdit,
  onDelete,
  index = 0
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-black/80 border border-accent/20 shadow-xl hover:shadow-accent/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255, 87, 51, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Certificate icon */}
      <div className="absolute top-4 left-4">
        <div className="bg-accent/20 p-2.5 rounded-full flex-shrink-0">
          <Award className="text-accent" size={20} />
        </div>
      </div>

      {/* Admin controls */}
      {isAdmin && onEdit && onDelete && (
        <div className="absolute top-4 right-4">
          <EditControls onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}

      {/* Certificate content with proper padding */}
      <div className="pt-16 pb-6 px-6">
        <h3 className="font-poppins text-lg md:text-xl font-semibold text-gradient mb-1">{certificate.title}</h3>
        <p className="text-muted-foreground text-xs md:text-sm flex flex-wrap items-center gap-1 mb-4">
          <span className="truncate max-w-[150px]">{certificate.issuer}</span>
          <span className="mx-1">•</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} className="opacity-70" />
            {formatDate(certificate.date)}
          </span>
        </p>
        
        {certificate.url && (
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="text-xs bg-black/40 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
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
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;
