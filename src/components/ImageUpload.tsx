
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload } from "lucide-react";
import { processProfileImage, readFileAsDataURL } from "@/utils/imageUtils";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  defaultImage: string;
  onImageChange: (imageData: string) => void;
  isProfile?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  defaultImage,
  onImageChange,
  isProfile = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // Check if it's an image
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Process the image differently based on whether it's a profile image
      let imageData: string;
      if (isProfile) {
        // Process profile image (grayscale + background removal)
        imageData = await processProfileImage(file);
      } else {
        // Regular image, just read it
        imageData = await readFileAsDataURL(file);
      }

      // Update the preview
      setPreviewUrl(imageData);
      
      // Call the parent handler
      onImageChange(imageData);

      toast({
        title: "Image uploaded",
        description: "Your image has been processed successfully",
      });
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process the image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {previewUrl ? (
        <div className="relative w-full h-64 overflow-hidden rounded-lg glass-card">
          <img
            src={previewUrl}
            alt="Uploaded image"
            className={`w-full h-full object-cover ${isProfile ? 'profile-image' : ''}`}
          />
          <Button
            size="sm"
            className="absolute bottom-2 right-2 opacity-80 hover:opacity-100"
            onClick={triggerFileInput}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Change"}
          </Button>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
          onClick={triggerFileInput}
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-sm text-muted-foreground">Processing image...</p>
            </div>
          ) : (
            <>
              <Image className="w-12 h-12 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload an image</p>
              <Button size="sm" disabled={isLoading}>
                <Upload className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageUpload;
