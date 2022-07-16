/// <reference types="@sveltejs/kit" />

export {};

interface UserInterface {
    id: string;
    username: string;
}

interface SessionInterface {
    user: UserInterface;
    token: string;
    css: string?;
    refresh_token: string?;
    user_experiments: number[];
}

declare global {
    namespace App {
        interface Locals {}
    
        interface Platform {}
    
        interface Session {
            session: SessionInterface;
            adminData: any;
        }
    
        interface Stuff {}
    }
}