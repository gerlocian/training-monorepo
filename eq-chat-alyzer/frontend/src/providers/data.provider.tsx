import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

interface Data {
    characterName?: string,
    tankName?: string,
    windows?: ChatWindow[],
}

interface ChatWindow {
    name: string,
}

export const DataContext = createContext<[Data, Dispatch<SetStateAction<Data>>]>([{}, () => {}]);

export default function DataProvider({ children }: { children: ReactNode }): ReactNode {
    const [ data, setData ] = useState({});

    useEffect(() => console.log(data), [data]);

    return (
        <DataContext.Provider value={[data, setData]}>
            {children}
        </DataContext.Provider>
    );
}