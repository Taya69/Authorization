export interface User {
    id: number;
    name: string;
    password: string,
    code: string;
    firstName? : string,
    lastName?: string,
    role?: string     
  }