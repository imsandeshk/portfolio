
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactInfo, Feedback, addFeedback } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from '@/utils/sendEmail';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Mail, MapPin, Phone, Send, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto">
        <SectionHeading
          title="Get in Touch"
          subtitle="Connect with me or leave your feedback."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Contact Info Card */}
          <motion.div
            className="premium-card rounded-xl p-6 overflow-hidden"
            variants={itemVariants}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gradient">Contact Information</h3>
              {isAdmin && onUpdateContact && (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  onClick={() => {
                    setEditEmail(contact.email);
                    setEditPhone(contact.phone || "");
                    setEditAddress(contact.address || "");
                    setEditLocation(contact.location || "");
                    setIsEditFormOpen(true);
                  }}
                  className="text-muted-foreground hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <Edit size={18} />
                </motion.button>
              )}
            </div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-accent transition-colors font-medium"
                  >
                    {contact.email}
                  </a>
                </div>
              </motion.div>

              {contact.phone && (
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-accent transition-colors font-medium"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>
              )}

              {(contact.address || contact.location) && (
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">
                      {contact.address ? `${contact.address}, ` : ""}
                      {contact.location}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Feedback Form Card */}
          <motion.div
            className="premium-card rounded-xl p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-gradient mb-4">Send a Message</h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus("idle");
                
                try {
                  await sendEmail(e);
                  setSubmitStatus("success");
                  toast({
                    title: "Message sent!",
                    description: "Thanks for your feedback. We'll get back to you shortly.",
                  });
                  setName("");
                  setEmail("");
                  setMessage("");
                  setRating(5);
                  
                  // Reset to idle after 3 seconds
                  setTimeout(() => {
                    setSubmitStatus("idle");
                  }, 3000);
                  
                } catch (err) {
                  setSubmitStatus("error");
                  toast({
                    title: "Failed to send",
                    description: "Please try again.",
                    variant: "destructive",
                  });
                  console.error("EmailJS error:", err);
                  
                  // Reset to idle after 3 seconds
                  setTimeout(() => {
                    setSubmitStatus("idle");
                  }, 3000);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input type="hidden" name="rating" value={rating} />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="from_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-accent/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="reply_to"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-accent/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 focus:border-accent/50 min-h-[120px]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={submitStatus}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`w-full ${
                      submitStatus === "success" 
                        ? "bg-green-600 hover:bg-green-700" 
                        : submitStatus === "error"
                        ? "bg-red-600 hover:bg-red-700"
                        : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        {submitStatus === "idle" && <Send className="mr-2 h-4 w-4" />}
                        {submitStatus === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
                        {submitStatus === "error" && <XCircle className="mr-2 h-4 w-4" />}
                        
                        {submitStatus === "idle" && "Send Message"}
                        {submitStatus === "success" && "Message Sent!"}
                        {submitStatus === "error" && "Failed to Send"}
                      </>
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>

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
