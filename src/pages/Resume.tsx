import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const [viewerUrl, setViewerUrl] = useState("");
  useEffect(() => {
    document.title = "Resume | Sandesh K";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "View and download the resume of Sandesh K.");
    const pdfAbsolute = `${window.location.origin}/resume.pdf`;
    setViewerUrl(`https://drive.google.com/viewerng/viewer?embedded=1&url=${encodeURIComponent(pdfAbsolute)}`);
  }, []);

  return (
    <main>
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume - Sandesh K
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            View the full resume below or download it as PDF.
          </motion.p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-accent text-white hover:bg-accent/90 transition-colors"
              download
            >
              Download PDF
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 border border-white/10 hover:bg-white/5 transition-colors"
            >
              Open in new tab
            </a>
          </div>

          <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
            <iframe
              src={viewerUrl || "/resume.pdf#view=FitH"}
              title="Resume - Sandesh K"
              className="w-full h-[75vh] md:h-[85vh]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
