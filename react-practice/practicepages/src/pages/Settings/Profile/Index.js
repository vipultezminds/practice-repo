import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material"

export const UpdateProfile = () => {

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
                                />
                                <TextField
                                    sx={{
                                        width: '48%'
                                    }}
                                    label='Last Name'
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='Bio'
                                    multiline
                                    maxRows={4}
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
                                    />
                                </Box>
                                <Box margin={3}>
                                    <TextField
                                        sx={{
                                            width: '100%'
                                        }}
                                        label='Twitter Url'
                                    />
                                </Box>
                                <Box margin={3}>
                                    <TextField
                                        sx={{
                                            width: '100%'
                                        }}
                                        label='Instagram Url'
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
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='Email'
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='PortFolio URL'
                                />
                            </Box>
                            <Box margin={3}>
                                <TextField
                                    id="outlined-multiline-static"
                                    sx={{
                                        width: '100%'
                                    }}
                                    label='Address'
                                    multiline
                                />
                            </Box>
                        </Box>

                    </Box>

                </Box>

            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Stack display={"flex"} flexDirection="row-reverse">
                <Button variant="contained" sx={{ marginLeft: 2 }}>Update Details</Button>
                <Button variant="outlined" sx={{ width: '81px' }}>Clear</Button>
            </Stack>
        </Box>
    )
}

