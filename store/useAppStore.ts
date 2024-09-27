import {defineStore} from 'pinia'
import type {FilterModelInterface} from "~/interfaces/filters/FilterModelInterface";
import type {FilterForInfoInterface} from "~/interfaces/filters/FilterForInfoInterface";

export const useAppStore = defineStore('useAppStore', {
    state: () => ({
        modal: {
            show: false
        } as {[key: string]: any },
        filterModel: {} as FilterModelInterface,
        filtersForInfo: [] as FilterForInfoInterface[],
        loading: true as boolean
    }),
    persist: process.client ? true : undefined,
    actions: {
        setDialog (data: any): void {
            this.modal = data
        },
        setFilterModel (data: FilterModelInterface): void {
            this.filterModel = data
        },
        setFiltersForInfo (data: FilterForInfoInterface[]): void {
            this.filtersForInfo = data
        },
        setLoading (data: boolean): void {
            this.loading = data
        }
    },
    getters: {
        getDialog: (state: any): {show: boolean, data: any} => {
            return state.modal
        },
        getFilterModel: (state: any): FilterModelInterface => {
            return state.filterModel
        },
        getFiltersForInfo: (state: any): FilterForInfoInterface[] => {
            return state.filtersForInfo
        },
        getLoading: (state: any): boolean => {
            return state.loading
        }
    }
})