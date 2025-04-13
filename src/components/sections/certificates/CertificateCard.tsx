
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import { ExternalLink, Award, Calendar, Image } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import EditControls from "@/components/EditControls";
import { useState } from "react";
import CertificateViewer from "./CertificateViewer";

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
  const [showViewer, setShowViewer] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <motion.div
        className="glass-card rounded-xl p-4 hover-glow border-l-4 border-l-accent w-full"
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
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-2">
            <div className="bg-accent/20 p-1.5 rounded-full mt-1 flex-shrink-0">
              <Award className="text-accent" size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="text-base md:text-lg font-playfair font-semibold text-gradient truncate">{certificate.title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm mt-0.5 flex flex-wrap items-center gap-1">
                <span className="truncate max-w-[100px] font-medium">{certificate.issuer}</span>
                <span className="mx-0.5 hidden md:inline">•</span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Calendar size={10} className="opacity-70" />
                  {formatDate(certificate.date)}
                </span>
              </p>
            </div>
          </div>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-3 ml-8 flex flex-wrap gap-2"
        >
          {certificate.imageUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowViewer(true)}
              className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
            >
              <Image className="mr-1 h-3 w-3" />
              View Certificate
            </Button>
          )}
          
          {certificate.url && (
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
                Verify
              </a>
            </Button>
          )}
        </motion.div>
      </motion.div>
      
      {certificate.imageUrl && (
        <CertificateViewer 
          isOpen={showViewer} 
          onClose={() => setShowViewer(false)} 
          certificate={certificate} 
        />
      )}
    </>
  );
};

export default CertificateCard;
