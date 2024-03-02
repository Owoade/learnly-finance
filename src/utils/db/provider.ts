import { DB_UTILS_CONSTANT } from "src/constants";
import { DatabaseUtils } from ".";

export const databaseUtilsProvider = {
    provide: DB_UTILS_CONSTANT,
    useValue: DatabaseUtils
}