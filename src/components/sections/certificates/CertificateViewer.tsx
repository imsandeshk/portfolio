
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Certificate } from "@/services/storageService";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/ui/image";

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  const handleDownload = () => {
    if (certificate.imageUrl) {
      const link = document.createElement('a');
      link.href = certificate.imageUrl;
      link.download = `${certificate.title} - ${certificate.issuer}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[90vw] p-0 bg-black/90 border-white/10 overflow-hidden">
        <DialogHeader className="p-4 text-center relative z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 text-white"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
          <DialogTitle className="text-xl font-playfair text-gradient">{certificate.title}</DialogTitle>
          <p className="text-sm text-white/70">{certificate.issuer}</p>
        </DialogHeader>
        
        <div className="relative overflow-hidden">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                className="p-4"
              >
                <div className="relative w-full aspect-[1.414/1] bg-gradient-to-b from-accent/5 to-transparent rounded-lg overflow-hidden shadow-lg">
                  {certificate.imageUrl && (
                    <img 
                      src={certificate.imageUrl} 
                      alt={`${certificate.title} Certificate`}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline"
                    className="bg-white/5 hover:bg-white/20 border-white/20 text-white gap-2"
                    onClick={handleDownload}
                  >
                    <Download size={16} />
                    Download Certificate
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateViewer;
