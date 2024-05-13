export class User {
    UserId?: string; 
    Username?: string;
    Password?: string;
    Email?: string; //is there a way for this to have a different type, such as EmailAddress like it does in the backend?
    Description?: string;
    Birthdate?: string; 

    constructor(UserId?: string,  Username?: string, Password?: string, Email?: string, Description?: string, Birthdate?: string){
        this.UserId = UserId;
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.Description = Description;
        this.Birthdate = Birthdate;
    }
}
