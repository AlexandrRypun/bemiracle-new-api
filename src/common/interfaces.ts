export interface AnyObject {
    [name: string]: any;
}

export interface GetManyResponse<T> {
    data: T[];
    total: number;
}
