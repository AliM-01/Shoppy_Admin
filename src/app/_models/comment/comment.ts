export class CommentModel {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public text: string,
        public type: CommentType,
        public state: CommentState,
        public ownerRecordId: number,
        public ownerName: string,
        public creationDate: string
    ) { }
}

export enum CommentType {
    Product,
    Article
}

export enum CommentState {
    Canceled,
    Confirmed
}