export class Score {
    public id: string
    public title: string
    public composer: string
    public creator: string
    public create_date: Date

    constructor(title: string, id?: string) {
        this.id = id;
        this.title = title;
    }
}