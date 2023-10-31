import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Stack, Checkbox, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';



const logo = "assets/tezminds_logo_1.png"
const backgroundImageUrl = "assets/bg_image_1.png";

const stackStyles = {
    backgroundImage: `url("${backgroundImageUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const Signup = () => {
    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={"close"}
                sx={stackStyles}
                PaperProps={{
                    style:{
                        borderRadius:16
                    }
                }}

            >
                <DialogContent>
                    <DialogTitle textAlign={'center'}>
                        <Box
                            component="img"
                            sx={{
                                height: 29,
                                width: 129,
                            }}
                            alt="TezMinds Logo"
                            src="assets/tezminds_logo_1.png"
                        />
                    </DialogTitle>
                    <Grid container direction="column" padding='0 42px' justify="center" width={'474px'}>
                        <Typography variant='h5' color='#0064D9' fontWeight='bold' fontFamily='Roboto' fontSize='22px' textAlign='center'>
                            SignUp
                        </Typography>
                        <Typography variant='body1' color='#6B7584' fontFamily='Poppins' fontSize='14px' textAlign='center' margin='8px'>
                            Enter your credentials to continue
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="First name"
                                    variant="outlined"
                                    style={{
                                        margin: '8px 0',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Last name"
                                    variant="outlined"
                                    style={{
                                        margin: '8px 0',
                                        borderRadius: '5px',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                            style={{
                                width: '390px',
                                margin: '8px 0',
                                borderRadius: '5px',
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            style={{
                                width: '390px',
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
                        </Typography>
                        <Stack sx={{
                            margin: '16px 0 '
                        }}>
                            <FormGroup>
                                <FormControlLabel fontFamily='roboto' control={<Checkbox />} label={<Typography style={{ color: '#6B7584' }}>Agree with <Link href="#" color="inherit" style={{ textDecoration: 'none', color: 'black', }}>Terms & Condition</Link>.</Typography>} />
                            </FormGroup>
                        </Stack>
                        <Button
                            variant='contained'
                            style={{
                                background: '#0064D9',
                                color: 'white',
                                padding: '6px 16px',
                                textTransform: 'none',
                            }}
                        >
                            Sign Up
                        </Button>
                        <Typography style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#0064D9',
                        }}>
                        </Typography>

                        <Link href="#" fontFamily={"roboto"} color="#0064D9" style={{ textDecoration: 'none', textAlign: 'center', margin: '20px 0', }}>Don’t have an account?</Link>
                    </Grid>


                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}
