
export type Priority = "red" | "yellow" | "green"

export type Task = {
    id:string
    title:string
    completed:boolean 
    createdAt:number
    dueDate?: number        // ← ? significa opcional
    priority?: Priority 
}

/*Isso significa:

* `id` → sempre string
* `title` → sempre texto
* `completed` → sempre boolean
* `createdAt` → sempre número (timestamp)*/