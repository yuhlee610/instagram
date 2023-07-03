import type { Adapter } from 'next-auth/adapters';
import type { SanityClient } from '@sanity/client';
export declare function SanityAdapter(client: SanityClient, options?: {
    schemas: {
        account: string;
        verificationToken: string;
        user: string;
    };
}): Adapter;
