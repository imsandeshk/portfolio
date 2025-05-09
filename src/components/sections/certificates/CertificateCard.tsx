
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import { ExternalLink, Award, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import EditControls from "@/components/EditControls";
import { useState } from "react";
import CertificateViewer from "./CertificateViewer";
import Image from "@/components/ui/image";

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

  // Generate a placeholder image URL for certificates that don't have an image
  const certificateImageUrl = certificate.image || 
    `https://via.placeholder.com/400x300/1A1F2C/FFFFFF?text=${encodeURIComponent(certificate.title)}`;

  return (
    <>
      <motion.div
        className="glass-card rounded-xl overflow-hidden border border-white/10 hover-glow"
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
        {/* Certificate Image Preview */}
        <div 
          className="relative h-36 w-full cursor-pointer"
          onClick={() => setShowViewer(true)}
        >
          <Image
            src={certificateImageUrl}
            alt={certificate.title}
            className="w-full h-full object-cover"
            fallbackSrc="/placeholder.svg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowViewer(true);
              }}
              className="m-3 text-xs bg-black/30 hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Eye className="mr-1 h-3 w-3" />
              View
            </Button>
          </div>
        </div>

        <div className="p-4">
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
          
          {certificate.url && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-3 ml-8"
            >
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/10"
              >
                <a 
                  href={certificate.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Verify Certificate
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <CertificateViewer 
        isOpen={showViewer} 
        onClose={() => setShowViewer(false)} 
        certificate={certificate} 
      />
    </>
  );
};

export default CertificateCard;
