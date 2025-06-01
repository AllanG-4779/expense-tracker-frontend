'use client';

import {Suspense, useContext, useEffect} from 'react';
import {AuthContext} from '../data/context/authContext';
import {useRouter, useSearchParams} from 'next/navigation';

const AuthClientRedirect = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const search = useSearchParams();


    useEffect(() => {
        if (!authContext) {
            throw new Error('AuthContext is not defined');
        }
        const {isAuthenticated} = authContext;
        const redirect = search.get('redirect');

        if (redirect && isAuthenticated) {
            router.push(redirect);
        } else if (isAuthenticated) {
            router.push('/account/expenses');
        }
    }, [authContext, router, search]);

    return null; // nothing to render
};

export const RedirectWrapper = () => {
    return <Suspense fallback={<div>Loading...</div>}>
        <AuthClientRedirect/>
    </Suspense>
}
