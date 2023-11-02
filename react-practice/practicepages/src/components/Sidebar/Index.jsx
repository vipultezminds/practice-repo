import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AllRoutes from '../../routes/DashboardRoutes/Index';
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

export default function Sidebar({ open }) {

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        marginTop: '64px',
                        backgroundColor: '#F7FBFF',
                        fontFamily: 'Monospace'
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Divider />
                <Stack>
                    <List>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
                            { text: 'Customer List', icon: <PeopleOutlinedIcon />, path: '/customer-list' },
                            { text: 'Settings', icon: <SettingsOutlinedIcon />, path: '/settings' },
                        ].map((item) => (
                            <ListItem key={item.text}>
                                <Link style={{ width: '100%', textDecoration: 'none', color: 'black', }} to={item.path}>
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </Link>
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
            <Main open={open}>
                <AllRoutes />
            </Main>
        </Box>
    );
}
