export interface CategoryDto {
    _id?: string;
    label: string;
    shortName: string;
    sortValue: number;
    parent: string;
    conditions: string[];
}

export interface CategoryWithCount extends CategoryDto {
    postCount: number;
}

export interface CategoryGroups {
    [key: string]: CategoryDto[];
}