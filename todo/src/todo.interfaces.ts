export interface CreateData {
    owner: string;
    title: string;
    description: string;
}

export interface GetData {
    owner: string;
}

export interface DeleteData {
    owner: string;
    id: string;
}
