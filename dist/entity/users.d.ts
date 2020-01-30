export declare enum UserRole {
    ADMIN = "admin",
    MEMBER = "member"
}
export declare class User {
    generateUuuid(): void;
    id: number;
    fullname: string;
    email: string;
    password: string;
    telp: string;
    level: string;
}
