export class CommentModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public text: string,
    public type: string,
    public state: string,
    public ownerRecordId: string,
    public ownerName: string,
    public creationDate: string
  ) { }
}
