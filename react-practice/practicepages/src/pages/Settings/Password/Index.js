import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material"

export const UpdatePassword = () => {

    return (
        <Box sx={{
            border: '2px solid #DEE4EA',
            borderRadius: 4,
        }}>
            <Box sx={{
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 'auto',
                height: 50,
            }}>
                <Typography 
                variant="h6"
                sx={{
                    paddingLeft: 3,
                }}>
                    Personal Information
                </Typography>
            </Box>
            <Divider sx={{ borderWidth: 1 }} />
            <Box>
                <Box margin={3}>
                    <TextField
                        sx={{
                            width: '48%'
                        }}
                        label='Current Password'
                    />
                </Box>
                <Box margin={3} display={"flex"} justifyContent={"space-between"}>
                    <TextField
                        sx={{
                            width: '48%'
                        }}
                        label='New Password'
                    />
                    <TextField
                        sx={{
                            width: '48%'
                        }}
                        label='Confirm Password'
                    />
                </Box>
                <Stack paddingBottom={2} paddingRight={'24px'} paddingLeft={'auto'} display={"flex"} flexDirection="row-reverse">
                    <Button variant="contained" sx={{ margin: 1 }}>Change Password</Button>
                    <Button variant="outlined" sx={{ margin: 1, width:'81px' }}>Clear</Button>
                </Stack>
            </Box>
        </Box>

    )
}

