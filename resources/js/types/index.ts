export type * from './auth';
export type * from './navigation';
export type * from './ui';


export interface AuthUser{
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    image_path: string | null;
    created_at: string;
    updated_at: string;
    user?: AuthUser;
}

export interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    flash?: {
        success?: string;
        erro?: string;
    };
}