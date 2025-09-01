
import { useState } from "react";
import { motion } from "framer-motion";
import { ContactInfo, Feedback, addFeedback } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from '@/utils/sendEmail';
import { useTheme } from "@/contexts/ThemeContext";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Mail, MapPin, Phone, Send, Star, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Updated import path

interface ContactSectionProps {
  contact: ContactInfo;
  isAdmin?: boolean;
  onUpdateContact?: (contact: ContactInfo) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  isAdmin = false,
  onUpdateContact,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const { theme } = useTheme();

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editEmail, setEditEmail] = useState(contact.email);
  const [editPhone, setEditPhone] = useState(contact.phone || "");
  const [editAddress, setEditAddress] = useState(contact.address || "");
  const [editLocation, setEditLocation] = useState(contact.location || "");

  const { toast } = useToast();

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateContact) {
      const updatedContact: ContactInfo = {
        email: editEmail,
        phone: editPhone || undefined,
        address: editAddress || undefined,
        location: editLocation || undefined,
      };
      onUpdateContact(updatedContact);
      toast({
        title: "Contact info updated",
        description: "Your contact information has been updated successfully.",
      });
      setIsEditFormOpen(false);
    }
  };

  const labelClass = '';
  const contactInfoClass = '';

  // Animation variants
  const formVariants = {
    submitting: {
      opacity: 0.7,
      scale: 0.98,
      transition: {
        duration: 0.2
      }
    },
    success: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    idle: {
      opacity: 1,
      scale: 1
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 10px rgba(255,255,255,0.5)"
    },
    tap: { scale: 0.95 },
    submitting: { 
      scale: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const, // Fixed: explicitly typing as const to ensure correct type
        duration: 0.8
      }
    }
  };
  
  const successIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto">
        <SectionHeading
          title="Get in Touch"
          subtitle="Get in touch or leave your feedback."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="glass-card rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Contact Information</h3>
              {isAdmin && onUpdateContact && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditEmail(contact.email);
                    setEditPhone(contact.phone || "");
                    setEditAddress(contact.address || "");
                    setEditLocation(contact.location || "");
                    setIsEditFormOpen(true);
                  }}
                >
                  <Edit size={18} />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {contact.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-accent transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {(contact.address || contact.location) && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p>
                      {contact.address ? `${contact.address}, ` : ""}
                      {contact.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            className="glass-card rounded-lg p-6 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            variants={formVariants}
            animate={isSubmitting ? "submitting" : formStatus}
          >
            <h3 className="text-xl font-bold mb-4">Send a Message</h3>

            {/* Success/Error Animation Overlays */}
            {formStatus === "success" && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg z-10"
                initial="hidden"
                animate="visible"
                variants={successIconVariants}
              >
                <motion.div 
                  className="flex flex-col items-center p-6 bg-green-500/20 rounded-lg border border-green-500/50 backdrop-blur-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle2 size={50} className="text-green-500 mb-3" />
                  <p className="text-white font-medium text-lg">Message sent successfully!</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-green-500/50 text-white hover:bg-green-500/20"
                    onClick={() => setFormStatus("idle")}
                  >
                    Close
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {formStatus === "error" && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg z-10"
                initial="hidden"
                animate="visible"
                variants={successIconVariants}
              >
                <motion.div 
                  className="flex flex-col items-center p-6 bg-red-500/20 rounded-lg border border-red-500/50 backdrop-blur-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <XCircle size={50} className="text-red-500 mb-3" />
                  <p className="text-white font-medium text-lg">Failed to send message</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-red-500/50 text-white hover:bg-red-500/20"
                    onClick={() => setFormStatus("idle")}
                  >
                    Try Again
                  </Button>
                </motion.div>
              </motion.div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setFormStatus("idle");
                
                try {
                  await sendEmail(e);
                  setFormStatus("success");
                  
                  toast({
                    title: "Message sent!",
                    description: "Thanks for your feedback. We'll get back to you shortly.",
                  });
                  
                  // Reset form
                  setName("");
                  setEmail("");
                  setMessage("");
                  setRating(5);
                } catch (err) {
                  setFormStatus("error");
                  
                  toast({
                    title: "Failed to send",
                    description: "Please try again.",
                    variant: "destructive",
                  });
                  console.error("EmailJS error:", err);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input type="hidden" name="rating" value={rating} />

              <div className="space-y-2">
                <Label htmlFor="name" className={labelClass}>Name</Label>
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Input
                    id="name"
                    name="from_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={labelClass}>Email</Label>
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Input
                    id="email"
                    name="reply_to"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className={labelClass}>Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                animate={isSubmitting ? "submitting" : "idle"}
                variants={buttonVariants}
              >
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center"
                      animate={{ opacity: [0.5, 1] }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8 }}
                    >
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </motion.div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      <span>Send Message</span>
                      
                      {/* Animated gradient */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-full bg-white/10"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Contact info edit dialog */}
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveContactInfo} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone (optional)</Label>
                  <Input
                    id="edit-phone"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-address">Address (optional)</Label>
                  <Input
                    id="edit-address"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="Your address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location (optional)</Label>
                  <Input
                    id="edit-location"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Contact Info</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ContactSection;
