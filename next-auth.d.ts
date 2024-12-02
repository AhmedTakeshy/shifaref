
declare module "@auth/core/adapters" {
    interface AdapterUser extends User {
        role: string
    }
}