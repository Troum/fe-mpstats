import {computed} from "vue";
import {useAppStore} from "~/store/useAppStore";

export function useLoggedIn() {

    const appStore = useAppStore()

    return computed(() => {
        return !!appStore.getToken
    })
}