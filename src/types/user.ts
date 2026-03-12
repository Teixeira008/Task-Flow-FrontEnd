export type User = { 
    id: string
    name: string
    email: string
    passwordHash: string
} 
export type Session = {
    token: string
    user: Omit<User, 'passwordHash'> 
}