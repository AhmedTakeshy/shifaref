import * as z from "zod";

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

const baseProductSchema = z.object({
    title: z.string().min(3).max(50),
    price: z.coerce.number().min(1),
    description: z.string().min(12),
    category: z.string().refine((value) => defaultCategories.includes(value), {
        message: "Invalid category",
    }),
    images: z.array(z.instanceof(File)),
    checkoutUrl: z.string().url(),
});

export const createProductSchema = baseProductSchema;

export const updateProductSchema = baseProductSchema.extend({
    oldImages: z.array(z.string()),
});


export type ContactSchema = z.infer<typeof contactSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type CreateModeratorSchema = z.infer<typeof createModeratorSchema>;
export type UpdateModeratorSchema = z.infer<typeof updateModeratorSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
