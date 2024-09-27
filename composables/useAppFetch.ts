import { useFetch, type UseFetchOptions } from "#app";
import { useAlertStore } from "@/store/useAlertStore";
import {useAppStore} from "~/store/useAppStore";

export async function useAppFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
    const alertStore = useAlertStore();
    const appStore = useAppStore()
    const config = useRuntimeConfig();

    options.baseURL = config.public.baseURL;
    options.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    options.onResponseError = ({ response }) => {
        const data = response._data;
        let alertConfig = {
            show: true,
            message: data?.message || "An error occurred",
            icon: '',
            color: 'red'
        };

        switch (response.status) {
            case 400:
            case 401:
            case 403:
            case 409:
                alertConfig.icon = 'i-heroicons-shield-exclamation';
                alertStore.setAlert(alertConfig);
                break;
            case 404:
                alertConfig.icon = 'i-heroicons-no-symbol';
                alertStore.setAlert(alertConfig);
                break;
            case 422:
                alertConfig.icon = 'i-heroicons-exclamation-circle';
                alertConfig.message = data?.errors
                    ? Object.values(data.errors).flat().join(', ')
                    : 'Validation error occurred';
                alertStore.setAlert(alertConfig);
                break;
            case 500:
            default:
                alertConfig.icon = 'i-heroicons-exclamation-triangle';
                alertStore.setAlert(alertConfig);
                break;
        }

        setTimeout(() => appStore.setLoading(false), 1500)

        return {
            data: null,
            error: new Error(data?.message || "An error occurred"),
        };
    };

    options.onResponse = ({ response }) => {
        const data = response._data;

        if (data?.message) {
            alertStore.setAlert({
                show: true,
                message: data.message,
                icon: 'i-heroicons-hand-thumb-up',
                color: 'green',
            });
        }

        setTimeout(() => appStore.setLoading(false), 1500)

        return {
            data,
            error: null,
        };
    };

    appStore.setLoading(true)

    return useFetch(url, options)
        .then((response) => {
            return response.data ? response : { data: null, error: new Error('Unexpected error occurred') };
        })
        .catch((error) => ({
            data: null,
            error,
        }));
}
