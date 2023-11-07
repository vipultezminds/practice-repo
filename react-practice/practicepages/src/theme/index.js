// import { createTheme } from '@mui/material/styles';

// export const commonTheme = createTheme({
//     components: {
//         MuiTypography: {
//             styleOverrides: {
//                 root: {
//                     fontFamily: 'Roboto, sans-serif !important',
//                 },
//                 h6: {
//                     fontFamily: 'poppins',
//                     fontSize: '1.2rem', // Adjust the font size as needed
//                     fontWeight: 'semi-bold',     // Adjust the font weight as needed
//                     letterSpacing : 1.50,
//                 },
//             },
//         },
//     },
// });


import { createTheme } from '@mui/material/styles';

export const commonTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto, sans-serif !important',
                },
                h6: {
                    fontFamily: 'poppins',
                    fontSize: '1.2rem', 
                    fontWeight: 'semi-bold', 
                    letterSpacing: 1.5,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', 
                    height:'52px'
                },
            },
        },
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:'8px',
                    height:'42px',
                    width:'172px',
                    boxShadow:'none',
                    textTransform:'capitalize',
                }
            }
        },
        MuiTab:{
            styleOverrides:{
                root:{
                    color:'black',
                    fontWeight : '450'
                }
            }
        }
    },
});
