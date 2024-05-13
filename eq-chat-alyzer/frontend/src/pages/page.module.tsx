import { ReactNode, useContext } from 'react';
import { DataContext } from '../providers/data.provider';

export function Page(): ReactNode {
    const [ context ] = useContext(DataContext)

    return (
        <div></div>
    );
}