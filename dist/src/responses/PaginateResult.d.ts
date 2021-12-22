export declare class PaginateResult<T> {
    readonly items: T[];
    readonly count: number;
    constructor(items: T[], count: number);
    static init(items: any, count: any): PaginateResult<unknown>;
}
