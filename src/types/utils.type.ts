export type SelectOptsType = {
    label: string;
    value: string;
};

export type SuccessResponseApi<T> = {
    status: string;
    data: T;
};
