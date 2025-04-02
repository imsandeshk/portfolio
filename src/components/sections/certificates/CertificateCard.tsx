
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import { ExternalLink } from "lucide-react";
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
      className="glass-card rounded-lg p-4 hover-glow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{certificate.title}</h3>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      
      <p className="text-muted-foreground text-sm mb-2">
        Issued by {certificate.issuer} • {formatDate(certificate.date)}
      </p>
      
      {certificate.url && (
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="mt-2 text-xs"
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
    </motion.div>
  );
};

export default CertificateCard;
