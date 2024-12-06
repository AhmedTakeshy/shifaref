
declare module "@auth/core/adapters" {
    interface AdapterUser extends User {
        id: string
        role: string
    }
}