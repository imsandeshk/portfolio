import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume | Sandesh K";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "View the resume of Sandesh K - skills, projects, and contact info.");
  }, []);

  return (
    <main>
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume - Sandesh K
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            The downloadable resume will be available here. Meanwhile, feel free to reach out from the Contact section.
          </motion.p>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-accent text-white hover:bg-accent/90 transition-colors"
              download
            >
              Download PDF
            </a>
            <a href="/#contact">
              <Button variant="outline">Go to Contact</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
