export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    balance: number;
  }
  
  export const users: User[] = [];
  