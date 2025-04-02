
import { toast } from "@/hooks/use-toast";

// MongoDB connection string
const MONGODB_URI = "mongodb+srv://worksandeshk:worksandeshk@cluster0.46kna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// API endpoint (we'll create a serverless function or use a service like Render/Railway)
const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://sandesh-portfolio-api.vercel.app/api" 
  : "http://localhost:3001/api";

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// API wrapper functions with error handling
async function apiRequest(endpoint: string, method: string, data?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API ${method} request failed:`, error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to connect to server",
      variant: "destructive",
    });
    throw error;
  }
}

// Function to upload image to MongoDB (wrapped in serverless function)
export const uploadImage = async (imageFile: File, type: string): Promise<string> => {
  try {
    const base64Data = await fileToBase64(imageFile);
    const response = await apiRequest('upload-image', 'POST', { image: base64Data, type });
    return response.imageUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    toast({
      title: "Upload Failed",
      description: "Could not upload image. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Note: In an actual implementation, you'd create serverless functions to handle these API calls
// or use a Backend-as-a-Service platform. This file provides the client-side portion.

// For now, let's export a message explaining that MongoDB integration requires a backend
export const getMongoDbInfo = () => {
  return {
    connectionString: MONGODB_URI,
    message: "To fully implement MongoDB functionality, you'll need a backend service. You can deploy a Node.js Express server or use serverless functions on Vercel to handle MongoDB operations."
  };
};
