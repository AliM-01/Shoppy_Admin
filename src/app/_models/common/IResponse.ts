export interface IResponse<T> {
    status:string;
    message:string;
    data: T;
    errors: string[];
}