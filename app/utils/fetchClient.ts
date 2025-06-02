import {useCallback} from "react";
import {useLoader} from "@/app/context/LoaderContext";
import {UniversalResponse} from "@/app/types/apiTypes";

export const useFetchClient = () => {
    const { showLoader, hideLoader } = useLoader();

    const fetchClient = useCallback(async <T = unknown>(
        path: string,
        body: unknown = {},
        method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE" = "POST",
        authenticated: boolean = false,
        token: string = "",
        options?: {
            showLoader?: boolean;
        }
    ): Promise<UniversalResponse<T>> => {
        const { showLoader: shouldShowLoader = true } = options || {};

        try {
            if (shouldShowLoader) showLoader();

            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            console.log("Base URL:", baseUrl);
            console.log("Access token:", token);

            if (!baseUrl) {
                throw new Error(
                    "Missing NEXT_PUBLIC_API_BASE_URL. Did you restart your dev server?"
                );
            }

            if (authenticated && !token) {
                const lToken = JSON.parse(localStorage.getItem("token") || "{}");
                if (!lToken) {
                    return {
                        message: "Unable to load data. If the problem persist try logging in again.",
                        successful: false,
                        status: 401
                    };
                }
                token = lToken.token || lToken.accessToken;
            }

            const headers: HeadersInit = authenticated
                ? {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
                : {
                    "Content-Type": "application/json",
                };

            console.log("Headers:", headers);

            const res = await fetch(`${baseUrl}${path}`, {
                method,
                headers: headers,
                body: method !== "GET" ? JSON.stringify(body) : undefined,
            });

            if (res.status >= 299 || res.status < 200) {
                return {
                    message: `Request failed with status ${res.status}`,
                    successful: false,
                    status: res.status,
                };
            }

            console.log("Response data:", res);
            const formatted = await res.json();

            return {
                message: "Response was successful",
                successful: true,
                body: formatted as T,
                status: res.status,
            };

        } catch (err) {

            return {
                status: 400,
                message: `Error fetching data: ${err}`,
                successful: false,
            };
        } finally {
            if (shouldShowLoader) hideLoader();
        }
    }, [showLoader, hideLoader]);

    return { fetchClient };
};
