
import { useState } from "react";
import { motion } from "framer-motion";
import { ContactInfo, Feedback, addFeedback } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Edit, Mail, MapPin, Phone, Send, Star } from "lucide-react";
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
  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Contact info edit state
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editEmail, setEditEmail] = useState(contact.email);
  const [editPhone, setEditPhone] = useState(contact.phone || "");
  const [editAddress, setEditAddress] = useState(contact.address || "");
  const [editLocation, setEditLocation] = useState(contact.location || "");
  
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create feedback object
      const feedback: Omit<Feedback, "id" | "date"> = {
        name,
        email: email || undefined,
        rating,
        comment: message,
      };
      
      // Add feedback
      addFeedback(feedback);
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
      
      // Show success toast
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle save contact info
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

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Contact Me" 
          subtitle="Get in touch or leave your feedback."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="glass-card rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
                  <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
              
              {contact.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors">
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
                    <p>{contact.address ? `${contact.address}, ` : ""}{contact.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Feedback Form */}
          <motion.div
            className="glass-card rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${value <= rating ? 'text-yellow-400' : 'text-muted-foreground'}`}
                      onClick={() => setRating(value)}
                    >
                      <Star className={value <= rating ? 'fill-yellow-400' : ''} size={18} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message or feedback"
                  rows={4}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
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
