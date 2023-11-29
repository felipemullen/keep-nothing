export interface CategoryDto {
    _id?: string;
    label: string;
    shortName: string;
    sortValue: number;
    parent: string;
    conditions: string[];
}

export interface CategoryGroups {
    [key: string]: CategoryDto[];
}