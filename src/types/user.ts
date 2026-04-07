export type Role = "admin" | "user" 
export type User = { 
    id: string
    name: string
    email: string
    passwordHash: string
    role: Role
} 
export type Session = {
    token: string
    user: Omit<User, 'passwordHash'> 
}