// import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material"


// export const UpdateProfile = () => {

//     return (
//         <Box>
//             <Box display={"flex"} justifyContent={"space-between"} marginBottom={3}>
//                 <Box sx={{
//                     width: '100%',
//                     paddingRight: '24px'
//                 }}>
//                     <Box sx={{
//                         marginBottom: 3,
//                         border: '2px solid #DEE4EA',
//                         borderRadius: '16px',
//                     }}>
//                         <Box sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginBottom: 'auto',
//                             height: 50
//                         }}>
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     paddingLeft: 3,
//                                     color: "black",
//                                     fontFamily: 'poppins',
//                                 }}>
//                                 Personal Details
//                             </Typography>
//                         </Box>
//                         <Divider sx={{ borderWidth: 1 }} />
//                         <Box>
//                             <Box margin={3} display={"flex"} justifyContent={"space-between"}>
//                                 <TextField
//                                     sx={{
//                                         width: '48%'
//                                     }}
//                                     label='First Name'
//                                 />
//                                 <TextField
//                                     sx={{
//                                         width: '48%'
//                                     }}
//                                     label='Last Name'
//                                 />
//                             </Box>
//                             <Box margin={3}>
//                                 <TextField
//                                     fullWidth
//                                     id="outlined-multiline-flexible"
//                                     label="Bio"
//                                     multiline
//                                     maxRows={4}
//                                     rows={2}
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             height: 'fit-content'
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </Box>
//                     </Box>
//                     <Box>
//                         <Box sx={{
//                             border: '2px solid #DEE4EA',
//                             borderRadius: '16px',
//                             padding: 'auto'
//                         }}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 marginBottom: 'auto',
//                                 height: 50
//                             }}>
//                                 <Typography
//                                     variant="h6"
//                                     sx={{
//                                         paddingLeft: 3,
//                                     }}>
//                                     Social Information
//                                 </Typography>
//                             </Box>
//                             <Divider sx={{ borderWidth: 1 }} />
//                             <Box>
//                                 <Box margin={3}>
//                                     <TextField
//                                         sx={{
//                                             width: '100%'
//                                         }}
//                                         label='Facebook Url'
//                                     />
//                                 </Box>
//                                 <Box margin={3}>
//                                     <TextField
//                                         sx={{
//                                             width: '100%'
//                                         }}
//                                         label='Twitter Url'
//                                     />
//                                 </Box>
//                                 <Box margin={3}>
//                                     <TextField
//                                         sx={{
//                                             width: '100%'
//                                         }}
//                                         label='Instagram Url'
//                                     />
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Box>

//                 </Box>
//                 <Box sx={{
//                     width: '100%',
//                 }}>
//                     <Box sx={{
//                         border: '2px solid #DEE4EA',
//                         borderRadius: '16px',
//                         padding: 'auto'
//                     }}>
//                         <Box sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginBottom: 'auto',
//                             height: 50
//                         }}>
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     paddingLeft: 3,
//                                 }}>
//                                 Contact Information
//                             </Typography>
//                         </Box>
//                         <Divider sx={{ borderWidth: 1 }} />
//                         <Box>
//                             <Box margin={3}>
//                                 <TextField
//                                     sx={{
//                                         width: '100%'
//                                     }}
//                                     label='Contact Phone'
//                                 />
//                             </Box>
//                             <Box margin={3}>
//                                 <TextField
//                                     sx={{
//                                         width: '100%'
//                                     }}
//                                     label='Email'
//                                 />
//                             </Box>
//                             <Box margin={3}>
//                                 <TextField
//                                     sx={{
//                                         width: '100%'
//                                     }}
//                                     label='PortFolio URL'
//                                 />
//                             </Box>
//                             <Box margin={3}>
//                                 <TextField
//                                     fullWidth
//                                     id="outlined-multiline-flexible"
//                                     label="Address"
//                                     multiline
//                                     maxRows={4}
//                                     rows={9.8}
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             height: 'fit-content'
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </Box>

//                     </Box>

//                 </Box>

//             </Box>
//             <Divider sx={{ marginBottom: 2 }} />
//             <Stack display={"flex"} flexDirection="row-reverse">
//                 <Button variant="contained" sx={{ marginLeft: 2 }}>Update Details</Button>
//                 <Button variant="outlined" sx={{ width: '81px' }}>Clear</Button>
//             </Stack>
//         </Box>
//     )
// }


import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { api } from '../../../services/api';

export const UpdateProfile = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        mobilenumber: 0,
        bio: "",
        address: "",
        image: "",
        portfoliourl: "",
        facebookurl: "",
        twitterurl: "",
        instagramurl: ""
    });

    useEffect(() => {
        // Fetch user details and prefill the form
        api.getUserDetails((data) => {
            console.log(data)
            setUserData(data.data);
        }, (error) => {
            console.error(error);
        });
    }, []);

    const handleUpdate = () => {
        // Update user details
        api.updateUserDetails(userData, () => {
            // Handle successful update
            alert("User details updated successfully!");
        }, (error) => {
            console.error(error);
            alert("Error updating user details");
        });
    };

    return (
        <Box>
            <Box display={"flex"} justifyContent={"space-between"} marginBottom={3}>
                <Box sx={{
                    width: '100%',
                    paddingRight: '24px'
                }}>
                    <Box sx={{
                        marginBottom: 3,
                        border: '2px solid #DEE4EA',
                        borderRadius: '16px',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 'auto',
                            height: 50
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    paddingLeft: 3,
                                    color: "black",
                                    fontFamily: 'poppins',
                                }}>
                                Personal Details
                            </Typography>
                        </Box>
                        <Divider sx={{ borderWidth: 1 }} />
                        <Box>
                            <Box margin={3} display={"flex"} justifyContent={"space-between"}>
                                <TextField
                                    sx={{
                                        width: '48%'
                                    }}
                                    label='First Name'
                                    value={userData.firstname}
                                    onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                                />
                                <TextField
                                    sx={{
                                        width: '48%'
                                    }}
                                    label='Last Name'
                                    value={userData.lastname}
                                    onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Bio"
                                    multiline
                                    maxRows={4}
                                    rows={2}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 'fit-content'
                                        }
                                    }}
                                    value={userData.bio}
                                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{
                            border: '2px solid #DEE4EA',
                            borderRadius: '16px',
                            padding: 'auto'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 'auto',
                                height: 50
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        paddingLeft: 3,
                                    }}>
                                    Social Information
                                </Typography>
                            </Box>
                            <Divider sx={{ borderWidth: 1 }} />
                            <Box>
                                <Box margin={3}>
                                    <TextField
                                        sx={{
                                            width: '100%'
                                        }}
                                        label='Facebook Url'
                                        value={userData.facebookurl}
                                        onChange={(e) => setUserData({ ...userData, facebookurl: e.target.value })}
                                    />
                                </Box>
                                <Box margin={3}>
                                    <TextField
                                        sx={{
                                            width: '100%'
                                        }}
                                        label='Twitter Url'
                                        value={userData.twitterurl}
                                        onChange={(e) => setUserData({ ...userData, twitterurl: e.target.value })}
                                    />
                                </Box>
                                <Box margin={3}>
                                    <TextField
                                        sx={{
                                            width: '100%'
                                        }}
                                        label='Instagram Url'
                                        value={userData.instagramurl}
                                        onChange={(e) => setUserData({ ...userData, instagramurl: e.target.value })}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                }}>
                    <Box sx={{
                        border: '2px solid #DEE4EA',
                        borderRadius: '16px',
                        padding: 'auto'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 'auto',
                            height: 50
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    paddingLeft: 3,
                                }}>
                                Contact Information
                            </Typography>
                        </Box>
                        <Divider sx={{ borderWidth: 1 }} />
                        <Box>
                            <Box margin={3}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='Contact Phone'
                                    value={userData.mobilenumber.toString()} // Convert it to a string for display
                                    onChange={(e) => setUserData({ ...userData, mobilenumber: parseInt(e.target.value, 10) })} // Parse the input to a number
                                    />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    fullWidth
                                    disabled
                                    id="outlined-multiline-flexible"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    sx={{}}
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='PortFolio URL'
                                    value={userData.portfoliourl}
                                    onChange={(e) => setUserData({ ...userData, portfoliourl: e.target.value })}
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Address"
                                    multiline
                                    maxRows={4}
                                    rows={9.8}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 'fit-content'
                                        }
                                    }}
                                    value={userData.address}
                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Stack display={"flex"} flexDirection="row-reverse">
                <Button variant="contained" sx={{ marginLeft: 2 }} onClick={handleUpdate}>
                    Update Details
                </Button>
                <Button variant="outlined" sx={{ width: '81px' }}>Clear</Button>
            </Stack>
        </Box>
    );
}