import { TextField } from '@mui/material';
import { ChangeEvent, ReactNode, useContext } from 'react';
import { DataContext } from '../providers/data.provider';

export default function CharacterNameField(): ReactNode {
    const [context, setContext] = useContext(DataContext);
    let changeEventTimer: number;

    function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (changeEventTimer) clearTimeout(changeEventTimer);
        changeEventTimer = setTimeout(() => setContext({ ...context, characterName: event.target.value }), 250);
    }

    return (
        <TextField
            variant="outlined"
            label="Character"
            defaultValue={context.characterName}
            onChange={updateField}
        ></TextField>
    );
}