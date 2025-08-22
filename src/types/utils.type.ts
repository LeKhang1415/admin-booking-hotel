export type SelectOptsType = {
    label: string;
    value: string;
};

export type SuccessResponseApi<T> = {
    status: string;
    data: T;
};

export type DeleteResponse = {
    status: string;
    data: { deleted: boolean; id: string };
};
