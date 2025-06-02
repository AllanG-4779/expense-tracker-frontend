'use client'

import React, {createContext, ReactNode, useContext, useState,} from "react";

interface LoaderContextType {
    isLoading: boolean,
    setIsLoading: (loading: boolean) => void,
    showLoader: () => void,
    hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error("useLoader must be used within the LoaderContextProvider")
    }
    return context;
}

export const LoaderContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(false)
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false)

    return <LoaderContext.Provider value={{isLoading: loading, setIsLoading: setLoading, showLoader, hideLoader}}>
        {children}
    </LoaderContext.Provider>
}