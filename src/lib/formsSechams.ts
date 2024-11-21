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
    subject: z.string().max(50, {
        message: "Subject must be at most 50 characters long"
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

export const signInSchema = z.object({
    email: z.string().trim().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().trim().min(8, {
        message: "Password must be at least 8 characters",
    })
})