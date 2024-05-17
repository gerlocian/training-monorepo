import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ReactNode, useContext } from 'react';
import { DataContext } from '../providers/data.provider';

export default function AddMenu(): ReactNode {
    const [ data, setData ] = useContext(DataContext);

    function handleClick(): void {
        const newData = { 
            ...data, 
            windows: [ 
                ...(data?.windows || []),
                { name: 'new window...' }
            ]
        };

        setData(newData);
    }

    return (
        <IconButton id="add-button" size="small" onClick={handleClick}>
            <Add/>
        </IconButton>
    );
}