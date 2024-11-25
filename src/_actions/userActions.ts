// "use server"
// import { ContactSchema, contactSchema, } from "@/lib/formsSchemas";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";



// export async function contactFormAction(values: ContactSchema): Promise<ServerResponse<null>> {

//     try {
//         const result = await contactSchema.safeParseAsync(values)
//         if (!result.success) {
//             return {
//                 statusCode: 400,
//                 status: "Error",
//                 errorMessage: result.error.errors[0].message,
//             }
//         }

//         const { fullName, email, subject, message, phone } = result.data
//         const messageSent = await prisma.contact.create({
//             data: {
//                 fullName,
//                 email,
//                 subject,
//                 phone,
//                 message,
//             }
//         })

//         if (!messageSent) {
//             return {
//                 statusCode: 502,
//                 status: "Error",
//                 errorMessage: "Internal Server Error message not sent!",
//             }
//         }
//         revalidatePath("/admin")
//         return {
//             statusCode: 200,
//             status: "Success",
//             successMessage: "Contact form submitted successfully",
//             data: null,
//         }
//     } catch {
//         return {
//             statusCode: 500,
//             status: "Error",
//             errorMessage: "Internal Server Error",
//         }
//     }
// }

// type MessagesMetadata = {
//     messages: ContactForm[],
//     metadata: PaginationMetadata
// }
// type MessagesProps = {
//     page?: string
//     search?: {
//         email?: string,
//         phone?: string,
//     }
//     read: boolean
// }
// export async function getMessages({ page, search, read }: MessagesProps): Promise<ServerResponse<MessagesMetadata>> {
//     const pageNumber = page ? Number(page) : 1
//     try {
//         const messages = await prisma.contact.findMany({
//             where: {
//                 email: {
//                     contains: search?.email,
//                     mode: "insensitive"
//                 },
//                 phone: {
//                     contains: search?.phone,
//                 },
//                 read
//             },
//             select: {
//                 id: true,
//                 fullName: true,
//                 email: true,
//                 phone: true,
//                 subject: true,
//                 message: true,
//                 read: true,
//                 createdAt: true,
//             },
//             orderBy: {
//                 createdAt: "desc"
//             },
//             skip: (pageNumber - 1) * 8,
//             take: 8,
//         })
//         if (!messages) {
//             return {
//                 statusCode: 404,
//                 status: "Error",
//                 errorMessage: "Messages not found!",
//             }
//         }
//         const totalMessages = await prisma.contact.count()
//         return {
//             statusCode: 200,
//             status: "Success",
//             successMessage: "Messages fetched successfully",
//             data: {
//                 messages,
//                 metadata: {
//                     hasNextPage: totalMessages > pageNumber * 8,
//                     totalPages: Math.ceil(totalMessages / 8),
//                 }
//             },
//         }
//     } catch {
//         return {
//             statusCode: 500,
//             status: "Error",
//             errorMessage: "Internal Server Error",
//         }
//     }
// }

// export async function readMessage(id: number): Promise<ServerResponse<null>> {
//     try {
//         const message = await prisma.contact.update({
//             where: {
//                 id
//             },
//             data: {
//                 read: true
//             }
//         })
//         if (!message) {
//             return {
//                 statusCode: 404,
//                 status: "Error",
//                 errorMessage: "Message not found!",
//             }
//         }
//         return {
//             statusCode: 200,
//             status: "Success",
//             successMessage: "Message read successfully",
//             data: null,
//         }
//     } catch {
//         return {
//             statusCode: 500,
//             status: "Error",
//             errorMessage: "Internal Server Error",
//         }
//     }
// }