export interface Student {
    id: string;
    name: string;
    email: string;
}

export interface CreateStudent {
    id?: string;
    name: string;
    email: string;
}