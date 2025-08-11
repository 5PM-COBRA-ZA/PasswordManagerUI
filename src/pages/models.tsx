export interface Profile {
    id: number,
    email: string,
    name: string,
    permissions: string[]
}

export interface Message {
    type: string,
    message: string
}