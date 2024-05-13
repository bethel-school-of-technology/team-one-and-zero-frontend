export class User {
    userId?: string; 
    username?: string;
    password?: string;
    email?: string; //is there a way for this to have a different type, such as EmailAddress like it does in the backend?
    description?: string;
    birthdate?: string; 

    constructor(userId?: string,  username?: string, password?: string, email?: string, description?: string, birthdate?: string){
        this.userId = UserId;
        this.username = Username;
        this.password = Password;
        this.email = Email;
        this.description = Description;
        this.birthdate = Birthdate;
    }
}
