import { TextField } from '@mui/material';
import { ChangeEvent, ReactNode, useContext } from 'react';
import { DataContext } from '../providers/data.provider';

export default function TankNameField(): ReactNode {
    const [context, setContext] = useContext(DataContext);
    let changeEventTimer: NodeJS.Timeout;

    function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (changeEventTimer) clearTimeout(changeEventTimer);
        changeEventTimer = setTimeout(() => setContext({ ...context, tankName: event.target.value }), 250);
    }

    return (
        <TextField
            variant="outlined"
            label="Tank"
            defaultValue={context.tankName}
            onChange={updateField}
        ></TextField>
    );
}