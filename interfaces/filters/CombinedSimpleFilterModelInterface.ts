export interface CombinedSimpleFilterModelInterface<T> {
    filterType: string;
    operator: string;
    condition1: T;
    condition2: T;
}