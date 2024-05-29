export class User {
    userId?: string; 
    username?: string;
    password?: string;
    email?: string; 
    description?: string;
    
    constructor( userId?: string, username?: string, password?: string, email?: string, description?: string){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.description = description;
    }
}
