import { Box, Divider, Typography, Stack, Button, FormGroup, FormControlLabel, Switch } from "@mui/material"

export const UpdateSettings = () => {

    return (
        <Box sx={{
            border: '2px solid #DEE4EA',
            borderRadius: '16px',
            padding: 'auto'
        }}>
            <Box sx={{
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 'auto',
                height: 48,
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        paddingLeft: 3,
                    }}>
                    Email Settings
                </Typography>
            </Box>
            <Divider sx={{ borderWidth: 1 }} />
            <Box sx={{padding:3}}>
                <Typography
                    variant="h6">
                    Setup Email Notifications
                </Typography>
                <FormGroup >
                    <FormControlLabel control={<Switch defaultChecked />} label="Email notification" sx={{
                        color: '#6B7584'
                    }} />
                    <FormControlLabel control={<Switch />} label="Send copy to personal email" sx={{
                        color: '#6B7584'
                    }} />
                </FormGroup>
            </Box>


            <Divider />
            {/* <TextField/> */}
            <Stack padding={1} display={"flex"} flexDirection="row-reverse">
                    <Button variant="contained" sx={{ margin: 1 }}>Update Settings</Button>
                </Stack>
        </Box>
    )

}