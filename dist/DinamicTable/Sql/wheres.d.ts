import { FilterType } from "../Filter";
export declare const wheresPostgres: {
    [key: string]: (filtro: FilterType) => string;
};
export declare const wheresMySQL: {
    [key: string]: (filtro: FilterType) => string;
};
declare const _default: {
    wheresPostgres: {
        [key: string]: (filtro: FilterType) => string;
    };
    wheresMySQL: {
        [key: string]: (filtro: FilterType) => string;
    };
};
export default _default;
