import React from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
import { Dashboard } from '../pages/Dashboard';
import CustomerList from '../pages/CustomerList';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const drawerWidth = 240;


const options = [
    'Edit',
    'Delete',
];

const dpURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'


const users =  [
    {
        "id": 1,
        "username": "Kaushal",
        "fullname": "Kaushal Vishwakarma",
        "isactive": false,
        "lastseen": "2023-10-31T06:49:56Z",
        "created_at": "2023-10-31 12:19:56",
        "mobile_no": 9369591287,
        "bio": "Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 12:19:56"
    },
    {
        "id": 4,
        "username": "Naveen",
        "fullname": "Naveen Sharma",
        "isactive": false,
        "lastseen": "2023-10-31T07:10:17Z",
        "created_at": "2023-10-31 12:40:18",
        "mobile_no": 9369591217,
        "bio": "Backend Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 12:40:18"
    },
    {
        "id": 5,
        "username": "Vipul",
        "fullname": "Vipul Kumar",
        "isactive": false,
        "lastseen": "2023-10-31T07:10:59Z",
        "created_at": "2023-10-31 12:40:59",
        "mobile_no": 9369591219,
        "bio": "Frontend Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 12:40:59"
    },
    {
        "id": 6,
        "username": "Shubham",
        "fullname": "Shubham Sapkal",
        "isactive": false,
        "lastseen": "2023-10-31T07:11:40Z",
        "created_at": "2023-10-31 12:41:41",
        "mobile_no": 8668430600,
        "bio": "Frontend Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 18:40:13"
    },
    {
        "id": 7,
        "username": "Abhishek",
        "fullname": "Abhishek Sir",
        "isactive": false,
        "lastseen": "2023-10-31T07:13:00Z",
        "created_at": "2023-10-31 12:43:01",
        "mobile_no": 9469591210,
        "bio": "Senior Software Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 18:17:34"
    },
    {
        "id": 33,
        "username": "JohnDoe",
        "fullname": "John Doe",
        "isactive": false,
        "lastseen": "2023-10-31T13:27:57Z",
        "created_at": "2023-10-31 18:57:57",
        "mobile_no": 9876543210,
        "bio": "Web Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 18:57:57"
    },
    {
        "id": 34,
        "username": "EmilySmith",
        "fullname": "Emily Smith",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:04Z",
        "created_at": "2023-10-31 18:58:05",
        "mobile_no": 7890123456,
        "bio": "Graphic Designer",
        "gender": "Female",
        "updated_at": "2023-10-31 18:58:05"
    },
    {
        "id": 35,
        "username": "AlexJohnson",
        "fullname": "Alex Johnson",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:12Z",
        "created_at": "2023-10-31 18:58:13",
        "mobile_no": 1234567890,
        "bio": "Data Scientist",
        "gender": "Male",
        "updated_at": "2023-10-31 18:58:13"
    },
    {
        "id": 36,
        "username": "SarahBrown",
        "fullname": "Sarah Brown",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:20Z",
        "created_at": "2023-10-31 18:58:20",
        "mobile_no": 2345678901,
        "bio": "UI/UX Designer",
        "gender": "Female",
        "updated_at": "2023-10-31 18:58:20"
    },
    {
        "id": 37,
        "username": "MichaelLee",
        "fullname": "Michael Lee",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:35Z",
        "created_at": "2023-10-31 18:58:35",
        "mobile_no": 3456789012,
        "bio": "Product Manager",
        "gender": "Male",
        "updated_at": "2023-10-31 18:58:35"
    },
    {
        "id": 38,
        "username": "AmandaWilson",
        "fullname": "Amanda Wilson",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:46Z",
        "created_at": "2023-10-31 18:58:47",
        "mobile_no": 4567890123,
        "bio": "Marketing Specialist",
        "gender": "Female",
        "updated_at": "2023-10-31 18:58:47"
    },
    {
        "id": 39,
        "username": "DanielClark",
        "fullname": "Daniel Clark",
        "isactive": false,
        "lastseen": "2023-10-31T13:28:53Z",
        "created_at": "2023-10-31 18:58:54",
        "mobile_no": 5678901234,
        "bio": "Software Engineer",
        "gender": "Male",
        "updated_at": "2023-10-31 18:58:54"
    },
    {
        "id": 40,
        "username": "JessicaThomas",
        "fullname": "Jessica Thomas",
        "isactive": false,
        "lastseen": "2023-10-31T13:29:00Z",
        "created_at": "2023-10-31 18:59:01",
        "mobile_no": 6789012345,
        "bio": "Content Writer",
        "gender": "Female",
        "updated_at": "2023-10-31 18:59:01"
    },
    {
        "id": 42,
        "username": "OliviaSmith",
        "fullname": "Olivia Smith",
        "isactive": false,
        "lastseen": "2023-10-31T13:29:31Z",
        "created_at": "2023-10-31 18:59:31",
        "mobile_no": 8901234567,
        "bio": "Graphic Designer",
        "gender": "Female",
        "updated_at": "2023-10-31 18:59:31"
    },
    {
        "id": 43,
        "username": "WilliamJohnson",
        "fullname": "William Johnson",
        "isactive": false,
        "lastseen": "2023-10-31T13:29:51Z",
        "created_at": "2023-10-31 18:59:51",
        "mobile_no": 9012345678,
        "bio": "Data Analyst",
        "gender": "Male",
        "updated_at": "2023-10-31 18:59:51"
    },
    {
        "id": 45,
        "username": "EmmaDavis",
        "fullname": "Emma Davis",
        "isactive": false,
        "lastseen": "2023-10-31T13:30:07Z",
        "created_at": "2023-10-31 19:00:07",
        "mobile_no": 1234569890,
        "bio": "UX Designer",
        "gender": "Female",
        "updated_at": "2023-10-31 19:00:07"
    },
    {
        "id": 47,
        "username": "JamesMiller",
        "fullname": "James Miller",
        "isactive": false,
        "lastseen": "2023-10-31T13:37:14Z",
        "created_at": "2023-10-31 19:07:14",
        "mobile_no": 2345679901,
        "bio": "Frontend Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 19:07:14"
    },
    {
        "id": 49,
        "username": "SophiaWhite",
        "fullname": "Sophia White",
        "isactive": false,
        "lastseen": "2023-10-31T13:37:43Z",
        "created_at": "2023-10-31 19:07:44",
        "mobile_no": 3456789312,
        "bio": "Marketing Manager",
        "gender": "Female",
        "updated_at": "2023-10-31 19:07:44"
    },
    {
        "id": 51,
        "username": "LiamTaylor",
        "fullname": "Liam Taylor",
        "isactive": false,
        "lastseen": "2023-10-31T13:38:23Z",
        "created_at": "2023-10-31 19:08:24",
        "mobile_no": 4567890193,
        "bio": "Software Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 19:08:24"
    },
    {
        "id": 53,
        "username": "AmeliaHill",
        "fullname": "Amelia Hill",
        "isactive": false,
        "lastseen": "2023-10-31T13:38:41Z",
        "created_at": "2023-10-31 19:08:42",
        "mobile_no": 5378901234,
        "bio": "Content Creator",
        "gender": "Female",
        "updated_at": "2023-10-31 19:08:42"
    },
    {
        "id": 55,
        "username": "BenjaminYoung",
        "fullname": "Benjamin Young",
        "isactive": false,
        "lastseen": "2023-10-31T13:38:58Z",
        "created_at": "2023-10-31 19:08:59",
        "mobile_no": 6789012349,
        "bio": "Backend Developer",
        "gender": "Male",
        "updated_at": "2023-10-31 19:08:59"
    },
    {
        "id": 57,
        "username": "ChloeKing",
        "fullname": "Chloe King",
        "isactive": false,
        "lastseen": "2023-10-31T13:39:31Z",
        "created_at": "2023-10-31 19:09:31",
        "mobile_no": 7890123458,
        "bio": "UI Designer",
        "gender": "Female",
        "updated_at": "2023-10-31 19:09:31"
    }
]

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
                        <List margin>
                            {[
                                { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
                                { text: 'Customer List', icon: <PeopleOutlinedIcon />, path: '/customer-list' },
                                { text: 'Settings', icon: <SettingsOutlinedIcon />, path: '/settings' },
                            ].map((item) => (
                                <ListItem key={item.text}>
                                    <Link style={{ width:'100%',textDecoration: 'none', color: 'black', }} to={item.path}>
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
                    <Routes>
                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route exact path="/customer-list" element={<CustomerList />} />
                        {/* <Route path="/settings" element={<Settings/>} /> */}
                        {/* Define routes for ContactUs and Pricing components here */}
                    </Routes>
                </Main>
            </Box>
    );
}
