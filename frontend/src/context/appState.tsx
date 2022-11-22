import React, { useContext, useEffect, useState, createContext } from "react";
const AppContext = createContext({ diamondAddress: '' });

const AppStateProvider = ({ children }: any): any => {

    const [diamondAddress, setDiamondAddress] = useState<string>("");

    const appState = {
        diamondAddress,
        setDiamondAddress,
    };

//     <AppContext.Provider value={appState}>
//     {children}
// </AppContext.Provider>
    console.log("inside appState.tsx");
    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    )
}

const useAppState = (): any => {
    return useContext(AppContext);
}

export {
    useAppState,
    AppStateProvider
}