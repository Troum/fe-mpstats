import { useAppFetch } from "#imports";
import type {UseFetchOptions} from "#app";
import type {FetchResult} from "#app";
import type {SignUpRequest} from "~/interfaces/requests/SignUpRequest";
import type {SignInRequest} from "~/interfaces/requests/SignInRequest";
import type {PasswordRecoveryRequest} from "~/interfaces/requests/PasswordRecoveryRequest";

export function useApiService() {
    async function signUp(userData: SignUpRequest): Promise<FetchResult<any, any>> {
        const url = '/signup';
        const options: UseFetchOptions<any> = {
            method: 'POST',
            body: userData
        };
        return useAppFetch(url, options);
    }
    async function passwordRecovery(recoveryData: PasswordRecoveryRequest): Promise<FetchResult<any, any>> {
        const url = '/password-recovery';
        const options: UseFetchOptions<any> = {
            method: 'POST',
            body: recoveryData
        };
        return useAppFetch(url, options);
    }
    async function signIn(userData: SignInRequest): Promise<FetchResult<any, any>> {
        const url = '/sign-in';
        const options: UseFetchOptions<any> = {
            method: 'POST',
            body: userData
        };
        return useAppFetch(url, options);
    }
    async function me(): Promise<FetchResult<any, any>> {
        const url = '/auth/me';
        const options: UseFetchOptions<any> = {
            method: 'GET'
        };
        return useAppFetch(url, options);
    }
    async function signOut(): Promise<FetchResult<any, any>> {
        const url = '/auth/sign-out';
        const options: UseFetchOptions<any> = {
            method: 'POST'
        };
        return useAppFetch(url, options);
    }
    async function getCategories(service: string): Promise<FetchResult<any, any>> {
        const url = `/categories?service=${service}`;
        const options: UseFetchOptions<any> = {
            method: 'GET'
        };
        return useAppFetch(url, options);
    }

    async function getCategory(queryString: string, data: any): Promise<FetchResult<any, any>> {
        const url = `/category?${queryString}`;
        const options: UseFetchOptions<any> = {
            method: 'POST',
            body: data
        };
        return useAppFetch(url, options);
    }

    async function getFiles(): Promise<FetchResult<any, any>> {
        const url = '/files';
        const options: UseFetchOptions<any> = {
            method: 'GET'
        };
        return useAppFetch(url, options);
    }

    return {
        signUp,
        signIn,
        signOut,
        me,
        passwordRecovery,
        getCategories,
        getCategory,
        getFiles
    };
}
