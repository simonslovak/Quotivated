export interface ApiResult {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}

export interface ApiResults {
    count: number;
    totalCount: number;
    page: number;
    totalPages: number;
    lastItemIndex: number;
    results: ApiResult[];
}