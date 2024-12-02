import * as z from "zod";
import prisma from "./prisma";
import { Label } from "@prisma/client";


export const contactSchema = z.object({
    fullName: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    phone: z.string().min(11, {
        message: "Phone number must be at least 11 characters long"
    }).max(15, {
        message: "Phone number must be at most 15 characters long"
    }),
    message: z.string().min(12, {
        message: "Message must be at least 12 characters long"
    })
});

export const loginSchema = z.object({
    email: z.string().trim().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().trim().min(8, {
        message: "Password must be at least 8 characters",
    })
})

export const createModeratorSchema = z.object({
    first_name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    last_name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    role: z.enum(["ADMIN", "SUPER_ADMIN"]),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const updateModeratorSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    role: z.enum(["ADMIN", "SUPER_ADMIN"]),
})

export const updatePasswordSchema = z.object({
    id: z.number().int().positive(),
    currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})

const categories = [
    {
        label: 'Personal Care',
        values: ["Perfumes & Aftershave", "Makeup (lipstick, mascara, foundation, eyeshadow)", "Cosmetics (deodorant, body spray, creams, serums)", "Skincare (Anti-aging, anti-wrinkle, face care creams, foams, masks)", "Aloe Vera Gel", "Mouth Hygiene (mouthwash, dental hygiene kit)", "Body & Intimate Care (body beauty, wellness, creams, gels)", "Hair Care (shampoos, conditioners)"]
    },
    {
        label: 'Health & Wellness',
        values: ["Supplements (food & beverages, vitamin C & A serum)", "Lactic Acid Skin Peel (for acne, age spots)", "Mental & Physical Fitness (health products)"]
    },
    {
        label: "Baby & Child Care",
        values: ["Baby & child care products"]
    },
    {
        label: "Lifestyle & Comfort",
        values: ["Comfort Items", "Hobby & Lifestyle Products", "Portable Blenders (battery powered)"]
    },
    {
        label: "Home & Kitchen",
        values: ["Kitchen Appliances"]
    },
    {
        label: "Beauty Accessories",
        values: ["Beauty Products & Accessories"]
    },
]
const defaultCategories = categories.flatMap((category) => category.values);
const getDynamicCategories = async () => {
    try {
        const dynamicCategories = await prisma.category.findMany({
            select: {
                name: true
            }
        })
        return dynamicCategories.map((category) => category.name);
    } catch {
        return [];
    }
}

export const createOrUpdateProductSchema = z.object({
    title: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    price: z.coerce.number().min(1.00, {
        message: "Price must be at least 1.00"
    }),
    description: z.string().min(12, {
        message: "Description must be at least 12 characters long"
    }),
    category: z.string().refine(async (value) => {
        const dynamicCategories = await getDynamicCategories();
        return defaultCategories.includes(value) || dynamicCategories?.includes(value);
    }, {
        message: "Category is invalid. Please select a valid category or create a new one."
    }),
    images: z.array(z.string().url({
        message: "Please enter a valid image URL"
    })),
    checkoutUrl: z.string().url({
        message: "Please enter a valid URL"
    }),
    label: z.nativeEnum(Label),
})


export type ContactSchema = z.infer<typeof contactSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type CreateModeratorSchema = z.infer<typeof createModeratorSchema>;
export type UpdateModeratorSchema = z.infer<typeof updateModeratorSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type CreateOrUpdateProductSchema = z.infer<typeof createOrUpdateProductSchema>;
