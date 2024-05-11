export class Comment {
    commentId?: string;
    username?: string;  // may need to be changed in the future?
    description?: string;
    postedAt?: string; // variable type may need to be changed (bc API has the post as a DatTime. Depends if it works or not)

    constructor(commentID?: string, username?:string, description?: string, postedAt?: string) {
        this.commentId = commentID;
        this.username = username;
        this.description = description;
        this.postedAt = postedAt;
    }
}
