import type { CredentialsConfig } from 'next-auth/providers';
import type { SanityClient } from '@sanity/client';
export declare const signUpHandler: (client: SanityClient, userSchema?: string) => (req: any, res: any) => Promise<Response | undefined>;
export declare const SanityCredentials: (client: SanityClient, userSchema?: string) => CredentialsConfig;
