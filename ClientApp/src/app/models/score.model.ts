export class Score {
    public id: string
    public title: string
    public composer: string
    public creator: string
    public createDate: Date

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}