export interface DatabaseUtilsInterface {
    dbTransaction<T>(callback: (...args: any[]) =>  Promise<T> ): Promise<T | null>;
}