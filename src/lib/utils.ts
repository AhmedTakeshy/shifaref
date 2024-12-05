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
    .from("products-images")
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

export async function deleteImage(file: string): Promise<ServerResponse<null>> {
  const fileName = file.split("/").pop() as string;
  const { data, error } = await supabase
    .storage
    .from("products-images")
    .remove([fileName]);
  console.log("🚀 ~ deleteImage ~ data:", data)

  if (error) {
    console.error("Error deleting image:", error.message);
    return {
      status: "Error",
      errorMessage: "Failed to delete the image!",
      statusCode: 401
    }
  }
  return {
    status: "Success",
    successMessage: "Image deleted successfully",
    statusCode: 200,
    data: null
  }
}
