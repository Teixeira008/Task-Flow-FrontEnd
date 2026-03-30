// /services/auth.service.ts
import { User, Session } from "@/types/user"

// 🧠 CONCEITO: isso simula o "banco de dados" de usuários
// Futuramente você troca isso por uma chamada de API real
const USERS_KEY = "taskflow:users"
const SESSION_KEY = "taskflow:session"

function getUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// 🧠 CONCEITO: geramos um token falso só para simular
// Em produção, esse token vem do servidor (JWT)
function generateFakeToken(): string {
  return crypto.randomUUID()
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<Session> {
  const users = getUsers()

  // Verifica se email já existe
  const exists = users.find((u) => u.email === email)
  if (exists) throw new Error("Email já cadastrado")

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: password, // mock: em prod usaria bcrypt
  }

  saveUsers([...users, newUser])

  const session: Session = {
    token: generateFakeToken(),
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function login(
  email: string,
  password: string
): Promise<Session> {
  const users = getUsers()

  const user = users.find(
    (u) => u.email === email && u.passwordHash === password
  )

  if (!user) throw new Error("Email ou senha incorretos")

  const session: Session = {
    token: generateFakeToken(),
    user: { id: user.id, name: user.name, email: user.email },
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function recoverPassword(email: string): Promise<string> {
  const users = getUsers()

  const user = users.find((u) => u.email === email)

  if (!user) throw new Error("Email não encontrado")

  return user.passwordHash  // ← no mock, retorna a senha direto
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession(): Session | null {
  const stored = localStorage.getItem(SESSION_KEY)
  return stored ? JSON.parse(stored) : null
}