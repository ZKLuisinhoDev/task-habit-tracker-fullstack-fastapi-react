export interface User {
    id: number;
    email: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    created_at: string;
    owner_id: number;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}
