import { createTheme } from '@mui/material/styles';

export const commonTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto, sans-serif',
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'black'
                },
            },
        },
    },
});
