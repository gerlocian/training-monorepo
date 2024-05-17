import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import DataProvider from '../providers/data.provider';
import Header from '../components/header.module';

const darkTheme = createTheme({ palette: { mode: 'dark' }});

export function LayoutDefault({ children }: { children: ReactNode }): ReactNode {
    return (
        <ThemeProvider theme={darkTheme}>
            <DataProvider>
                <CssBaseline/>
                <Header></Header>
                {children}
            </DataProvider>
        </ThemeProvider>
    );
}