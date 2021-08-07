export interface TempImages {
    path:string
    name:string
    delete:boolean
}
export interface Posts {
    slug:string
    body:string
    active:boolean
    createdAt:Date
}
export interface Members {
    email: string,
    password: string
}

export interface Comments {
    name:string
    email:string
    comment:string
    createdAt:Date
}