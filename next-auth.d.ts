
declare module "@auth/core/adapters" {
    interface AdapterUser extends User {
        id: string
        email: string
        role: string
    }
}