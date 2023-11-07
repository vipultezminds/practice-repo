// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { UpdateProfile } from './UpdateProfile/Index';
// import { UpdatePassword } from './UpdatePassword/Index';
// import { UpdateSettings } from './UpdateSettings/Index';

// function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

// export default function SettingTabs() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ width: '100%' ,backgroundColor:'#F7FBFF', paddingBottom:65}}>
//             <Box height={65}></Box>
//             <Box margin={2.5} backgroundColor={'white'}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                         <Tab label="Personal Details" {...a11yProps(0)} /> {/* component={Link} to="/settings/personal" */}
//                         <Tab label="Change Password" {...a11yProps(1)} />  {/* component={Link} to="/settings/password" */}
//                         <Tab label="Settings" {...a11yProps(2)} /> {/* component={Link} to="/settings/settings" */}
//                     </Tabs>
//                 </Box>
//                 <CustomTabPanel value={value} index={0}>
//                     <UpdateProfile/>
//                 </CustomTabPanel>
//                 <CustomTabPanel value={value} index={1}>
//                     <UpdatePassword/>
//                 </CustomTabPanel>
//                 <CustomTabPanel value={value} index={2}>
//                     <UpdateSettings/>
//                 </CustomTabPanel>
//             </Box>
//         </Box>
//     );
// }

// // import * as React from 'react';
// // import PropTypes from 'prop-types';
// // import Tabs from '@mui/material/Tabs';
// // import Tab from '@mui/material/Tab';
// // import Typography from '@mui/material/Typography';
// // import Box from '@mui/material/Box';
// // import { Link } from 'react-router-dom';

// // function CustomTabPanel(props) {
// //     const { children, value, index, ...other } = props;

// //     return (
// //         <div
// //             role="tabpanel"
// //             hidden={value !== index}
// //             id={`simple-tabpanel-${index}`}
// //             aria-labelledby={`simple-tab-${index}`}
// //             {...other}
// //         >
// //             {value === index && (
// //                 <Box sx={{ p: 3 }}>
// //                     <Typography>{children}</Typography>
// //                 </Box>
// //             )}
// //         </div>
// //     );
// // }

// // CustomTabPanel.propTypes = {
// //     children: PropTypes.node,
// //     index: PropTypes.number.isRequired,
// //     value: PropTypes.number.isRequired,
// // };

// // export default function SettingTabs({ value, handleChange }) {
// //     return (
// //         <Box sx={{ width: '100%' }}>
// //             <Box height={65}></Box>
// //             <Box margin={2.5}>
// //                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
// //                     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
// //                         <Tab label="Personal Details" /> 
// //                         <Tab label="Change Password" />
// //                         <Tab label="Settings" />   
// //                     </Tabs>
// //                 </Box>
// //                 <CustomTabPanel value={value} index={0}>
// //                     Personal Details
// //                 </CustomTabPanel>
// //                 <CustomTabPanel value={value} index={1}>
// //                     Change Password
// //                 </CustomTabPanel>
// //                 <CustomTabPanel value={value} index={2}>
// //                     Settings
// //                 </CustomTabPanel>
// //             </Box>
// //         </Box>
// //     );
// // }


import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { UpdateProfile } from './Profile/Index';
import { UpdatePassword } from './Password/Index';
import { UpdateSettings } from './Settings/Index';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{padding : '24px 0'}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function SettingTabs() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);

        // Determine the tab path based on the selected tab index
        let tabPath;
        switch (newValue) {
            case 0:
                tabPath = 'personal';
                break;
            case 1:
                tabPath = 'password';
                break;
            case 2:
                tabPath = 'settings';
                break;
            default:
                tabPath = 'personal';
        }

        // Update the URL with the selected tab path
        navigate(`/settings/${tabPath}`);
    };

    return (
        <Box sx={{ width: '100%', backgroundColor: '#F7FBFF', paddingBottom: 65 }}>
            <Box height={60}></Box>
            <Box margin={3} backgroundColor={'white'} borderRadius={4}>
                <Box padding={3} paddingBottom={0}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                            <Tab label="Personal Details" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                            <Tab label="Settings" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <UpdateProfile />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <UpdatePassword />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <UpdateSettings />
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    );
}
