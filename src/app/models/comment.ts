export class Comment {
    commentID?: number;
    username?: string;  // may need to be changed in the future?
    description?: string;
    songId?: string;
    postedAt?: string; // variable type may need to be changed (bc API has the post as a DatTime. Depends if it works or not)

    constructor(commentID?: number, username?:string, description?: string, songId?: string, postedAt?: string) {
        this.commentID = commentID;
        this.username = username;
        this.description = description;
        this.songId = songId;
        this.postedAt = postedAt;
    }
}
