
export interface registerUser {
    UserName: string;
    Password: string;
    Email?: string;
} 

export interface RegisterReturn {
    token?: string;
    errors?: { code: string, description: string }[]
}