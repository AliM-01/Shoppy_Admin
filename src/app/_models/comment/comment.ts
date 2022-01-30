export class CommentModel {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public text: string,
        public type: string,
        public state: string,
        public ownerRecordId: number,
        public ownerName: string,
        public creationDate: string
    ) { }
}