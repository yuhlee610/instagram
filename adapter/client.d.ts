import type { User } from 'next-auth';
export declare type SignUpPayload = {
    email: string;
    password: string;
    name?: string;
    image?: string;
} & Record<string, any>;
export declare const signUp: (payload: SignUpPayload) => Promise<User>;
