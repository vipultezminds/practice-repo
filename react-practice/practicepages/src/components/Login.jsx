// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import Typography from '@mui/material/Typography';
// import { TextField, Grid } from '@mui/material';
// const logo = "assets/tezminds_logo_1.png"
// const backgroundImageUrl = "assets/bg_image_1.png";

// const stackStyles = {
//     backgroundImage: `url("${backgroundImageUrl}")`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '100%x'
// };

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));


// export const Signup = () => {


//     return (
//         <div>
//             <BootstrapDialog
//                 aria-labelledby="customized-dialog-title"
//                 open={"close"}
//                 sx={stackStyles}
//             >
//                 <DialogTitle textAlign={'center'} marginTop={'20px'}>
//                     <img src={logo} />
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     <Grid container direction="column" paddingLeft={'42px'} paddingRight={'42px'} justify="center" width={'474px'}>
//                         <Typography variant='h5' color='#0064D9' fontWeight='bold' fontFamily='Poppins' fontSize='22px' textAlign='center'>
//                             Hi, Welcome Back
//                         </Typography>
//                         <Typography variant='body1' color='#6B7584' fontFamily='Poppins' fontSize='14px' textAlign='center' margin='8px'>
//                             Enter your credentials to continue
//                         </Typography>
//                         <TextField
//                             id="outlined-basic"
//                             label="Email Address / Username"
//                             variant="outlined"
//                             style={{
//                                 width: '390px',
//                                 margin: '8px 0',
//                                 borderRadius:'5px',
//                             }}
//                         />
//                         <TextField
//                             id="outlined-basic"
//                             label="Password"
//                             variant="outlined"
//                             style={{
//                                 width: '390px',
//                                 margin: '8px 0',
//                                 borderRadius: '5px',   
//                             }}
//                         />

//                         <Typography
//                             font='normal normal normal 14px/21px Poppins SemiBold'
//                             color='#0064D9'
//                             fontWeight={'bold'}
//                             textAlign='right'
//                         >Forgot Password?</Typography>

//                         <Button
//                             variant='contained'
//                             style={{
//                                 marginTop: '18px',
//                                 background: '#0064D9',
//                                 color: 'white',
//                                 padding: '6px 16px',
//                                 textTransform: 'none',
//                             }}
//                         >
//                             Sign In
//                         </Button>
//                         <Typography style={{
//                             font: 'normal normal normal 14px/21px Poppins SemiBold',
//                             fontWeight: 'bold',
//                             textAlign: 'center',
//                             marginTop: '35px',
//                             marginBottom: '40px',
//                             color: '#0064D9',
//                         }}>Don’t have an account?</Typography>
//                     </Grid>
//                 </DialogContent>
//             </BootstrapDialog>
//         </div>
//     )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'; 
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';

const logo = "assets/tezminds_logo_1.png"
const backgroundImageUrl = "assets/bg_image_1.png";

const stackStyles = {
    backgroundImage: `url("${backgroundImageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const Login = () => {
    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={"close"}
                sx={stackStyles}
                
            >
                <DialogContent>
                <DialogTitle textAlign={'center'}>
                    <img src={logo} />
                </DialogTitle>
                    <Grid container direction="column" padding='18px' justify="center" width={'400px'}>
                        <Typography variant='h5' color='#0064D9' fontWeight='bold' fontFamily='Roboto' fontSize='22px' textAlign='center'>
                            Hi, Welcome Back
                        </Typography>
                        <Typography variant='body1' color='#6B7584' fontSize='14px' textAlign='center' margin='8px'>
                            Enter your credentials to continue
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Email Address / Username"
                            variant="outlined"
                            style={{
                                margin: '8px 0',
                                borderRadius: '5px',
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            style={{
                                margin: '8px 0',
                                borderRadius: '5px',
                            }}
                        />

                        <Typography
                            font='normal normal normal 14px/21px Poppins SemiBold'
                            color='#0064D9'
                            fontWeight={'bold'}
                            textAlign='right'
                        >
                            <Link href="#" color="inherit" style={{
                                textDecoration:'none',
                            }}>Forgot Password?</Link>
                        </Typography>

                        <Button
                            variant='contained'
                            style={{
                                marginTop: '18px',
                                background: '#0064D9',
                                color: 'white',
                                padding: '6px 16px',
                                textTransform: 'none',
                                borderRadius:'8px',
                            }}
                        >
                            Sign In
                        </Button>
                        <Typography style={{
                            font: 'normal normal normal 14px/21px Poppins SemiBold',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: '35px',
                            color: '#0064D9',
                        }}>
                            <Link href="#" color="inherit" style={{
                                textDecoration:'none',
                                fontFamily:'Roboto',
                            }}>Don’t have an account?</Link>
                        </Typography>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}
