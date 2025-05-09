"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Certificate } from "@/lib/data/storageService";
import CertificateViewer from "./certificate-viewer";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type Props = {
  certificate: Certificate;
};

const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), "MMM yyyy");
  } catch {
    return dateString;
  }
};

export default function CertificateCard({ certificate }: Props) {
  const [showViewer, setShowViewer] = useState(false);
  const certificateImageUrl = certificate.image;

  return (
    <>
      <Card className="rounded-xl bg-card shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div
          className="relative aspect-video overflow-hidden cursor-pointer"
          onClick={() => setShowViewer(true)}
        >
          {certificateImageUrl ? (
            <img
              src={certificateImageUrl}
              alt={`Certificate: ${certificate.title}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowViewer(true);
                  }}
                  aria-label="View certificate"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Certificate</TooltipContent>
            </Tooltip>

            {certificate.verificationLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={certificate.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Verify certificate"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Verify Certificate</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4 py-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="text-base md:text-lg font-playfair font-semibold text-gradient truncate">
                {certificate.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{certificate.title}</TooltipContent>
          </Tooltip>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="truncate max-w-[100px] font-medium">
              {certificate.issuer || "Unknown Issuer"}
            </span>
            <span>{certificate.date ? formatDate(certificate.date) : "No Date"}</span>
          </div>
        </div>
      </Card>

      {showViewer && (
        <CertificateViewer
          imageUrl={certificateImageUrl}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
}
