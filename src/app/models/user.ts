export class User {
    userId?: string; 
    username?: string;
    password?: string;
    email?: string; 
    description?: string;
    birthdate?: string; 
    profilePic?: any;
    
    constructor( userId?: string, username?: string, password?: string, email?: string, description?: string, birthdate?: string, profilePic?: any){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.description = description;
        this.birthdate = birthdate;
        this.profilePic = profilePic;
    }
}
