export class Score {
    public id?: string
    public title: string
    public composer: string
    public creator: string
    public createDate: Date

    constructor(title: string, id?: string) {
        this.id = id;
        this.title = title;
    }
}