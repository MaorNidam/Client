export interface IUser {
    token: string;
    firstName: string;
    lastName: string;
    role: string;
    city?: string;
    street?: string;
}