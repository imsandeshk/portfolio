// ⬆️ Your existing imports remain the same
import { useState } from "react";
import { motion } from "framer-motion";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            className="glass-card rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Send a Message</h3>

            <form
  onSubmit={async (e) => {
    setIsSubmitting(true);
    try {
      await sendEmail(e);
      toast({
        title: "Message sent!",
        description: "Thanks for your feedback. We'll get back to you shortly.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
    } catch (err) {
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
    <Label htmlFor="name">Name</Label>
    <Input
      id="name"
      name="from_name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      name="reply_to"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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
    />
  </div>

  <Button type="submit" disabled={isSubmitting} className="w-full">
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
