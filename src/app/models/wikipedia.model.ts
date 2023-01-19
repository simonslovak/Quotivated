export interface Original {
    source?: string;
    width?: number;
    height?: number;
}

export interface Content {
    pageid?: number;
    ns?: number;
    title?: string;
    original?: Original;
}

export interface Pages {
    content?: Content;
}

export interface Query {
    pages?: Pages;
}

export interface RootWikiRes {
    batchcomplete?: string;
    query?: Query;
}
