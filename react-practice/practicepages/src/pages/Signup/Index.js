// import * as React from 'react';
// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import {Link} from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import Typography from '@mui/material/Typography';
// import { TextField, Grid, Stack, Checkbox, Box } from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import { api } from '../../services/api';


// const backgroundImageUrl = "assets/bg_image_1.png";

// const stackStyles = {
//     backgroundImage: `url("${backgroundImageUrl}")`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '100%',
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

//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         agreeTerms: false,
//       });
    
//       const [errors, setErrors] = useState({});
    
//       const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const newValue = type === 'checkbox' ? checked : value;
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: newValue,
//         }));
//       };
    
//       const handleSubmit = () => {
//         // Perform form validation
//         const newErrors = {};
    
//         if (!formData.firstName) {
//           newErrors.firstName = 'First name is required';
//         }
    
//         if (!formData.email) {
//           newErrors.email = 'Email is required';
//         }
    
//         if (!formData.password) {
//           newErrors.password = 'Password is required';
//         }
    
//         if (!formData.agreeTerms) {
//           newErrors.agreeTerms = 'You must agree to the terms and conditions';
//         }
    
//         if (Object.keys(newErrors).length > 0) {
//           setErrors(newErrors);
//           return;
//         }
    
//         // Call your signup API here
//         api.signup(formData.firstName, formData.lastName, formData.email, formData.password)
//           .then(() => {
//             // Successful signup, you can redirect to a success page or perform any other action
//             // window.location.href = '/success';
//           })
//           .catch((error) => {
//             // Handle signup error
//             console.error(error);
//             // You can display an error message to the user
//           });
//       };


//     return (
//         <div>
//             <BootstrapDialog
//                 aria-labelledby="customized-dialog-title"
//                 open={"close"}
//                 sx={stackStyles}
//                 PaperProps={{
//                     style:{
//                         borderRadius:16
//                     }
//                 }}

//             >
//                 <DialogContent>
//                     <DialogTitle textAlign={'center'}>
//                         <Box
//                             component="img"
//                             sx={{
//                                 height: 29,
//                                 width: 129,
//                             }}
//                             alt="TezMinds Logo"
//                             src="assets/tezminds_logo_1.png"
//                         />
//                     </DialogTitle>
//                         <Grid container direction="column" padding='0 42px' justify="center" width={'474px'}>
//                             <Typography variant='h5' color='#0064D9' fontWeight='bold' fontFamily='Roboto' fontSize='22px' textAlign='center'>
//                                 SignUp
//                             </Typography>
//                             <Typography variant='body1' color='#6B7584' fontFamily='Poppins' fontSize='14px' textAlign='center' margin='8px'>
//                                 Enter your credentials to continue
//                             </Typography>
//                             <Grid container spacing={2} alignItems="center">
//                                 <Grid item xs={6}>
//                                     <TextField
//                                         id="outlined-basic"
//                                         label="First name"
//                                         variant="outlined"
//                                         style={{
//                                             margin: '8px 0',
//                                             borderRadius: '5px',
//                                         }}
//                                         required
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <TextField
//                                         id="outlined-basic"
//                                         label="Last name"
//                                         variant="outlined"
//                                         style={{
//                                             margin: '8px 0',
//                                             borderRadius: '5px',
//                                         }}
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <TextField
//                                 id="outlined-basic"
//                                 label="Email Address"
//                                 variant="outlined"
//                                 required
//                                 style={{
//                                     width: '390px',
//                                     margin: '8px 0',
//                                     borderRadius: '5px',
//                                 }}
//                             />
//                             <TextField
//                                 id="outlined-basic"
//                                 label="Password"
//                                 type="password"
//                                 variant="outlined"
//                                 required
//                                 style={{
//                                     width: '390px',
//                                     margin: '8px 0',
//                                     borderRadius: '5px',
//                                 }}
//                             />
//                             <Typography
//                                 font='normal normal normal 14px/21px Poppins SemiBold'
//                                 color='#0064D9'
//                                 fontWeight={'bold'}
//                                 textAlign='right'
//                             >
//                             </Typography>
//                             <Stack sx={{
//                                 margin: '16px 0 '
//                             }}>
//                                 <FormGroup>
//                                     <FormControlLabel fontFamily='roboto' control={<Checkbox />} label={<Typography style={{ color: '#6B7584' }}>Agree with <Link href="#" color="inherit" style={{ textDecoration: 'none', color: 'black', }}>Terms & Condition</Link>.</Typography>} />
//                                 </FormGroup>
//                             </Stack>
//                             <Button
//                                 variant='contained'
//                                 style={{
//                                     background: '#0064D9',
//                                     color: 'white',
//                                     padding: '6px 16px',
//                                     textTransform: 'none',
//                                     width:'100%'
//                                 }}
//                             >
//                                 Sign Up
//                             </Button>
//                             <Typography style={{
//                                 fontFamily: 'Roboto',
//                                 fontWeight: 'bold',
//                                 textAlign: 'center',
//                                 color: '#0064D9',
//                             }}>
//                             </Typography>

//                             <Link to='/' fontFamily={"roboto"} color="#0064D9" style={{ textDecoration: 'none', textAlign: 'center', margin: '20px 0',color:'#0064D9', fontWeight:'bold' }}>Don’t have an account?</Link>
//                         </Grid>
//                 </DialogContent>
//             </BootstrapDialog>
//         </div>
//     )
// }
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Stack, Checkbox, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { api } from '../../services/api';
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

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    // Perform form validation
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call your signup API here
    api.signup(formData.firstName, formData.lastName, formData.email, formData.password)
      .then(() => {
        // Successful signup, you can redirect to a success page or perform any other action
        // window.location.href = '/success';
        alert('Now Go to login')
      })
      .catch((error) => {
        // Handle signup error
        console.error(error);
        // You can display an error message to the user
      });
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={"close"}
        sx={stackStyles}
        PaperProps={{
          style: {
            borderRadius: 16,
          },
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
                  id="firstName"
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  style={{
                    margin: '8px 0',
                    borderRadius: '5px',
                  }}
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <Typography color="error">{errors.firstName}</Typography>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  style={{
                    margin: '8px 0',
                    borderRadius: '5px',
                  }}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              required
              style={{
                width: '390px',
                margin: '8px 0',
                borderRadius: '5px',
              }}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Typography color="error">{errors.email}</Typography>}
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              style={{
                width: '390px',
                margin: '8px 0',
                borderRadius: '5px',
              }}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Typography color="error">{errors.password}</Typography>}
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
                <FormControlLabel
                  fontFamily='roboto'
                  control={<Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />}
                  label={<Typography style={{ color: '#6B7584' }}>Agree with <Link to="#" color="inherit" style={{ textDecoration: 'none', color: 'black', }}>Terms & Condition</Link>.</Typography>}
                />
                {errors.agreeTerms && <Typography color="error">{errors.agreeTerms}</Typography>}
              </FormGroup>
            </Stack>
            <Button
              variant='contained'
              style={{
                background: '#0064D9',
                color: 'white',
                padding: '6px 16px',
                textTransform: 'none',
                width: '100%'
              }}
              onClick={handleSubmit}
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

            <Link to='/' fontFamily={"roboto"} color="#0064D9" style={{ textDecoration: 'none', textAlign: 'center', margin: '20px 0', color: '#0064D9', fontWeight: 'bold' }}>Don’t have an account?</Link>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
