// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { Badge, Stack } from '@mui/material';


// // const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function Navbar() {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <AppBar position="static" sx={{ bgcolor: '#f7fbff' }}>
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'100%'} >
//                         <Stack display={'flex'} flexDirection={'row'}>
//                             <Box
//                                 component="img"
//                                 sx={{
//                                     height: 29,
//                                     width: 129,
//                                     margin:'auto'
//                                 }}
//                                 alt="TezMinds Logo"
//                                 src="assets/tezminds_logo_1.png"
//                             />

//                             <IconButton
//                                 size="large"
//                                 edge="start"
//                                 color="black"
//                                 aria-label="menu"
//                                 sx={{ mr: 2, marginLeft: '10px', }}
//                             >
//                                 <MenuIcon />
//                             </IconButton>

//                         </Stack>
//                         <Stack display={'flex'} flexDirection={'row'} >
//                             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                                 <IconButton
//                                     size="large"
//                                     aria-label="account of current user"
//                                     aria-controls="menu-appbar"
//                                     aria-haspopup="true"
//                                     onClick={handleOpenNavMenu}
//                                     color="black"
//                                 >
//                                     <MenuIcon />
//                                 </IconButton>
//                             </Box>
//                             <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//                             <Typography
//                                 variant="h5"
//                                 noWrap
//                                 component="a"
//                                 href="#app-bar-with-responsive-menu"
//                                 sx={{
//                                     mr: 2,
//                                     display: { xs: 'flex', md: 'none' },
//                                     flexGrow: 1,
//                                     fontFamily: 'monospace',
//                                     fontWeight: 700,
//                                     letterSpacing: '.3rem',
//                                     color: 'inherit',
//                                     textDecoration: 'none',
//                                 }}
//                             >
//                                 LOGO
//                             </Typography>
//                             <IconButton
//                                 size="large"
//                                 aria-label="show 17 new notifications"
//                                 color="black"
//                                 margin="30px"
//                             >
//                                 <Badge badgeContent={17} color="error">
//                                     <NotificationsIcon />
//                                 </Badge>
//                             </IconButton>


//                             <Box sx={{ flexGrow: 0, marginLeft: '20px' }}>
//                                 <Tooltip title="Open settings">
//                                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                         <Avatar alt="Remy Sharp" src="" />
//                                     </IconButton>
//                                 </Tooltip>
//                                 <Menu
//                                     sx={{ mt: '45px' }}
//                                     id="menu-appbar"
//                                     anchorEl={anchorElUser}
//                                     anchorOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     keepMounted
//                                     transformOrigin={{
//                                         vertical: 'top',
//                                         horizontal: 'right',
//                                     }}
//                                     open={Boolean(anchorElUser)}
//                                     onClose={handleCloseUserMenu}
//                                 >
//                                     {settings.map((setting) => (
//                                         <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                             <Typography textAlign="center">{setting}</Typography>
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </Box>
//                         </Stack>
//                     </Stack>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }
// export default Navbar;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Stack, useMediaQuery } from '@mui/material';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar({handleDrawer,open}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static" sx={{ bgcolor: '#f7fbff',boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px '}}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'100%'} >
                        <Stack display={'flex'} flexDirection={'row'}>
                            <Box
                                component="img"
                                sx={{
                                    margin: 'auto'
                                }}
                                alt="TezMinds Logo"
                                src="assets/tezminds_logo_1.png"
                            />
                            <IconButton
                                size="large"
                                edge="start"
                                color="black"
                                aria-label="menu"
                                sx={{ mr: 2, marginLeft: '10px', }}
                                onClick={()=>{handleDrawer(!open)}}

                            >
                                <MenuIcon />
                            </IconButton>

                        </Stack>
                        <Stack display={'flex'} flexDirection={'row'} >

                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 ,}} />
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="black"
                                margin="30px"
                            >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                            </IconButton>


                            <Box sx={{ flexGrow: 0, marginLeft: '20px', }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,}}>
                                        <Avatar alt="user icon" src="assets/vipul-kumar-photo.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
