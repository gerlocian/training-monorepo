import { IconButton, Menu, MenuItem } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { MouseEvent, ReactNode, useState } from 'react';
import CharacterNameField from './character-field.module';
import TankNameField from './tank-field.module';

export default function SettingsMenu(): ReactNode {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const isOpen = !!anchorElement;

    function handleOpen(event: MouseEvent<HTMLButtonElement>): void {
        setAnchorElement(event.currentTarget);
    }

    function handleClose(): void {
        setAnchorElement(null);
    }

    return (
        <>
            <IconButton 
                id="settings-button" 
                size="small" 
                onClick={handleOpen}
            >
                <Settings/>
            </IconButton>
            <Menu
                anchorEl={anchorElement}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id="settings-menu"
                open={isOpen}
                onClose={handleClose}
                sx={{ mb: '20px' }}
                MenuListProps={{ variant: 'menu' }}
            >
                <MenuItem><CharacterNameField/></MenuItem>
                <MenuItem><TankNameField/></MenuItem>
            </Menu>
        </>
    )
}