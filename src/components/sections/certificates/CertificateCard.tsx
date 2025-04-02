
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import { Award, Calendar, ExternalLink, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import EditControls from "@/components/EditControls";

interface CertificateCardProps {
  certificate: Certificate;
  isAdmin?: boolean;
  onEdit?: (certificate: Certificate) => void;
  onDelete?: (certificate: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const isMobile = useIsMobile();

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      className="glass-card rounded-lg p-5 hover-scale card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Award className="text-accent mr-2 flex-shrink-0" size={isMobile ? 18 : 22} />
          <h3 className="text-lg font-bold text-white">{certificate.title}</h3>
        </div>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls 
            onEdit={() => onEdit(certificate)} 
            onDelete={() => onDelete(certificate)} 
          />
        )}
      </div>
      
      <div className="pl-7 mb-4">
        <p className="text-sm font-medium mb-1">{certificate.issuer}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(certificate.date)}</span>
        </div>
      </div>
      
      {/* Credential ID and URL */}
      <div className="pl-0 md:pl-7">
        {certificate.credentialId && (
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-medium">Credential ID:</span> {certificate.credentialId}
          </p>
        )}
        
        {certificate.url && (
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className="mt-2 w-full sm:w-auto"
            asChild
          >
            <a href={certificate.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-1.5" />
              <span>View Certificate</span>
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;
