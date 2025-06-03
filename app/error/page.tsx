'use client'

import React, {Suspense} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import ErrorPageComponent from "@/app/components/ErrorPageComponent";


const ErrorPage: React.FC = () => {
    return <Suspense>
        <Wrapper/>
    </Suspense>
}

const Wrapper: React.FC = () => {
    const router = useRouter();
    const search = useSearchParams();
    const errorMessage = search.get('message') || 'An unexpected error occurred';
    const errorCode = parseInt(search.get('code') as string) || 500;

    const handleGoBack = () => {
        router.back();
    };
    return <ErrorPageComponent statusCode={errorCode} message={errorMessage} onRetry={handleGoBack}/>
}
export default ErrorPage;