"use server"
import { ContactSchema, contactSchema, } from "@/lib/formsSchemas";
import { revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";


export async function contactFormAction(values: ContactSchema): Promise<ServerResponse<null>> {

    try {
        const result = await contactSchema.safeParseAsync(values)
        if (!result.success) {
            return {
                statusCode: 400,
                status: "Error",
                errorMessage: result.error.errors[0].message,
            }
        }

        const { fullName, email, message, phone } = result.data
        const messageSent = await prisma.contact.create({
            data: {
                fullName,
                email,
                phone,
                message,
            }
        })

        if (!messageSent) {
            return {
                statusCode: 502,
                status: "Error",
                errorMessage: "Internal Server Error message not sent!",
            }
        }
        revalidateTag("messages")
        return {
            statusCode: 200,
            status: "Success",
            successMessage: "Contact form submitted successfully",
            data: null,
        }
    } catch {
        return {
            statusCode: 500,
            status: "Error",
            errorMessage: "Internal Server Error",
        }
    }
}

