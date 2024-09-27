import {defineStore} from 'pinia'

export const useResultStore = defineStore('useResultStore', {
    state: () => ({
        rows: [] as any[],
        url: null as any
    }),
    persist: process.client ? true : undefined,
    actions: {
        setRows (data: any[]): void {
            this.rows = data
        },
        setUrl (data: string|null): void {
            this.url = data
        }
    },
    getters: {
        getRows: (state: any): any[] => {
            return state.rows
        },
        getUrl: (state: any): string => {
            return state.url
        }
    }
})