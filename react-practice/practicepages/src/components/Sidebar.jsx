import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Dashboard } from '../pages/Dashboard';
const drawerWidth = 240;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

export default function Sidebar({ handleDrawer, open, theme }) {

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        marginTop: '64px',
                        backgroundColor:'#F7FBFF',  
                        fontFamily:'Monospace'
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Divider />
                <Stack>
                    <List margin>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon /> },
                            { text: 'Customer List', icon: <PeopleOutlinedIcon /> },
                            { text: 'Settings', icon: <SettingsOutlinedIcon /> }
                        ].map((item) => (
                            <ListItem key={item.text} >
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
                <Divider />
                <List>
                    {['Contact us', 'Pricing'].map((text, index) => (
                        <ListItem key={text} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <MailIcon /> : <AttachMoneyOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open} >
                <Dashboard />
            </Main>
        </Box>

    );
}
