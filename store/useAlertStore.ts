import {defineStore} from 'pinia'

export const useAlertStore = defineStore('useAlertStore', {
    state: () => ({
        alert: {
            show: false
        } as {[key: string]: any }
    }),
    actions: {
        setAlert(data: any): void {
            this.alert = data
        }
    },
    getters: {
        getAlert: (state: any): {[key: string]: any } => {
            return state.alert
        }
    }
})