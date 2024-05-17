import { AppBar, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import AddMenu from './add-menu.module';
import SettingsMenu from './settings-menu.module';

export default function Header(): ReactNode {
    return (
        <AppBar sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar variant="dense" sx={{ justifyContent: 'flex-end' }}>
                <AddMenu/>
                <SettingsMenu/>
            </Toolbar>
        </AppBar>
    );
}