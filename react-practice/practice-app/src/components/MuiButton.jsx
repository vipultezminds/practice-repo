import { Stack, Button, IconButton, ButtonGroup, ToggleButtonGroup, ToggleButton } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useState } from "react";


export const MuiButton = () => {
    const [formats, setFormats] = useState([]);

    const handleFormatChange = (
        _event,
        updatedFormats
    ) => {
        setFormats(updatedFormats);
    };
    function alertUser(){
        alert('Sending a alert');
    }

    return (
        <Stack spacing={3} justifyContent={"center"}>
            <Stack spacing={3} direction={"row"} justifyContent={"center"}>
                <Button variant="text">Some button</Button>
                <Button variant="contained" className="btnVar">Some button</Button>
                <Button variant="outlined">Some button</Button>
                <Button variant="contained" href="https://google.com">Google</Button>
            </Stack>

            <Stack spacing={2} direction={"row"} justifyContent={"center"}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary" style={{ textTransform: 'none' }}>Secondary</Button>
                <Button variant="contained" color="error">error</Button>
                <Button variant="contained" color="warning">warning</Button>
                <Button variant="contained" color="info">info</Button>
                <Button variant="contained" color="success" >Success</Button>
            </Stack>

            <Stack display={"block"} spacing={2} direction={"row"}>
                <Button variant="contained" size="small">Small Button</Button>
                <Button variant="contained" size="medium">Medium Button</Button>
                <Button variant="contained" size="large">Large Button</Button>
            </Stack>

            <Stack display={"block"} spacing={2} direction={"row"}>
                <Button>
                    <SendIcon color="success"></SendIcon>
                </Button>
                <IconButton color="error" aria-label="send" >
                    <NearbyErrorIcon />
                </IconButton>
                <Button variant="contained" startIcon={<SendIcon color="error" />}>Send Button</Button>
                <Button variant="contained" endIcon={<SendIcon />}>Send Button</Button>
            </Stack>
            <Stack direction={"row"} justifyContent={"center"}>
                 <ButtonGroup variant="contained" orientation="vertical">
                    <Button onClick={alertUser}>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                 </ButtonGroup>
            </Stack>
            <Stack spacing={3} justifyContent={"center"} direction={"row"}>
                <ToggleButtonGroup aria-label="text formatting" value={formats} onChange={handleFormatChange}>
                    <ToggleButton value='bold'>
                        <FormatBoldIcon/>
                    </ToggleButton>
                    <ToggleButton value='italic'>
                        <FormatUnderlinedIcon/>
                    </ToggleButton>
                    <ToggleButton value='underlined' >
                        <FormatItalicIcon/>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
        </Stack>
    )
}