'use client'
import React, {Suspense} from "react";
import LoginScreen from "@/app/components/LoginScreen";

export function LoginScreenWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginScreen />
        </Suspense>
    );
}