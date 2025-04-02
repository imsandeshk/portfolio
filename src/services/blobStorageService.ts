
import { put } from '@vercel/blob';
import { toast } from "@/hooks/use-toast";

// Vercel Blob Storage token
const BLOB_READ_WRITE_TOKEN = "vercel_blob_rw_QKvzeozkkPF9PlsE_s4AYarwCBQC0hc918uLNC4yjL21JnS";

// Helper function to convert file to Blob
export const fileToBlob = async (file: File): Promise<Blob> => {
  return new Blob([await file.arrayBuffer()], { type: file.type });
};

// Upload image to Vercel Blob Storage
export const uploadImage = async (imageFile: File, type: string): Promise<string> => {
  try {
    const fileName = `${type}_${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
    const blob = await fileToBlob(imageFile);
    
    const { url } = await put(fileName, blob, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
    });
    
    return url;
  } catch (error) {
    console.error("Image upload failed:", error);
    toast({
      title: "Upload Failed",
      description: "Could not upload image to Vercel Blob Storage. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Store JSON data in Vercel Blob Storage
export const storeData = async (key: string, data: any): Promise<string> => {
  try {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    const { url } = await put(`data/${key}.json`, blob, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
    });
    
    return url;
  } catch (error) {
    console.error(`Failed to store ${key} data:`, error);
    toast({
      title: "Storage Failed",
      description: `Could not store ${key} data. Please try again.`,
      variant: "destructive",
    });
    throw error;
  }
};

// Fetch data from Vercel Blob Storage
export const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Data fetch failed:", error);
    toast({
      title: "Fetch Failed",
      description: "Could not retrieve data. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Store and fetch profile data
export const storeProfileData = async (data: any): Promise<void> => {
  await storeData('profile', data);
};

export const fetchProfileData = async (): Promise<any> => {
  try {
    return await fetchData('profile');
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null;
  }
};

// Store and fetch projects data
export const storeProjectsData = async (data: any): Promise<void> => {
  await storeData('projects', data);
};

export const fetchProjectsData = async (): Promise<any> => {
  try {
    return await fetchData('projects');
  } catch (error) {
    console.error("Failed to fetch projects data:", error);
    return [];
  }
};

// Get info about Vercel Blob storage
export const getBlobStorageInfo = () => {
  return {
    token: BLOB_READ_WRITE_TOKEN,
    message: "Vercel Blob Storage is configured. You can upload and store data using this service."
  };
};
