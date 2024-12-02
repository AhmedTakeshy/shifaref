import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabaseClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const uploadImage = async (file: File): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase
    .storage
    .from("products-images") // Replace with your Supabase bucket name
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  // Get the public URL of the uploaded file
  const { data: publicUrlData } = supabase
    .storage
    .from("products-images")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
};
