// import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
// import React, { useState } from "react";
// import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
// import Skeleton from '@mui/material/Skeleton';

// import CustomerList from "../CustomerList/Index";
// import CardGrid from "../../utils/CardGrid/CardGrid";
// import SalesButton from "../../utils/CardGrid/SalesButtonGroup/BtnGroup";


// const cardStyle = {
//     height: 120, backgroundColor: '#0064D9', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
// }

// const iconCss = {
//     color: 'white', width: 50, height: 55
// }

// const buttonCSS = {
//     margin: '0 2px',
//     height: '28px',
//     textTransform: 'none',
//     color: activeButton === "This Year" ? '#0064D9' : '#B3B8BD',
//     backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
//     "&:hover": {
//         backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
//     },
//     boxShadow: 'none'
// }

// export const Dashboard = () => {

//     const [activeButton, setActiveButton] = useState("All time");


//     const cardData = [
//         { icon: <PeopleOutlinedIcon sx={iconCss} />, title: "Customers", count: 98 },
//         { icon: <DescriptionOutlinedIcon sx={iconCss} />, title: "Invoice", count: 98 },
//         { icon: <BugReportOutlinedIcon sx={iconCss} />, title: "Issues", count: 98 },
//     ];

//     const buttonLabels = ['All time', 'This Year', 'This Week', 'Today'];

//     const handleButtonClick = (label) => {
//         setActiveButton(label);
//     };

//     return (
//         <Box padding={3} backgroundColor={'#F7FBFF'} marginTop={'60px'} >
//             <Box>
//                 <CardGrid cardData={cardData} />
//                 <Box sx={{
//                     backgroundColor: 'white',
//                     padding: 2,
//                 }}>
//                     <Typography sx={{
//                         textAlign: 'left',
//                         letterSpacing: ' 3px',
//                         color: '#6B7584',
//                         opacity: 1,
//                         fontWeight: 'bold',
//                         fontFamily: 'Roboto',
//                         fontSize: 22
//                     }}>
//                         Lead Sales
//                     </Typography>
//                     <SalesButton
//                         activeButton={activeButton}
//                         handleButtonClick={handleButtonClick}
//                         buttonLabels={buttonLabels}
//                         buttonStyles={buttonCSS}
//                     />

//                     {/* <Box marginTop={2}>
//                         <Box>
//                             <Button
//                                 onClick={() => handleButtonClick("All time")}
//                                 sx={{
//                                     margin: '0 2px',
//                                     height: '28px',
//                                     color: activeButton === "All time" ? '#0064D9' : '#B3B8BD',
//                                     textTransform: 'none',
//                                     backgroundColor: activeButton === "All time" ? "#DEECFB" : "white",
//                                     "&:hover": {
//                                         backgroundColor: activeButton === "All time" ? "#DEECFB" : "white",
//                                     },
//                                     boxShadow: 'none'
//                                 }}
//                             >
//                                 All time
//                             </Button>
//                             <Button
//                                 onClick={() => handleButtonClick("This Year")}
//                                 sx={{
//                                     margin: '0 2px',
//                                     height: '28px',
//                                     textTransform: 'none',
//                                     color: activeButton === "This Year" ? '#0064D9' : '#B3B8BD',
//                                     backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
//                                     "&:hover": {
//                                         backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
//                                     },
//                                     boxShadow: 'none'
//                                 }}
//                             >
//                                 This Year
//                             </Button>
//                             <Button
//                                 onClick={() => handleButtonClick("This Week")}
//                                 sx={{
//                                     margin: '0 2px',
//                                     height: '28px',
//                                     textTransform: 'none',
//                                     color: activeButton === "This Week" ? '#0064D9' : '#B3B8BD',
//                                     backgroundColor: activeButton === "This Week" ? "#DEECFB" : "white",
//                                     "&:hover": {
//                                         backgroundColor: activeButton === "This Week" ? "#DEECFB" : "white",
//                                     },
//                                     boxShadow: 'none'
//                                 }}
//                             >
//                                 This Week
//                             </Button>
//                             <Button
//                                 onClick={() => handleButtonClick("Today")}
//                                 sx={{
//                                     margin: '0 2px',
//                                     height: '28px',
//                                     textTransform: 'none',
//                                     color: activeButton === "Today" ? '#0064D9' : '#B3B8BD',
//                                     backgroundColor: activeButton === "Today" ? "#DEECFB" : "white",
//                                     "&:hover": {
//                                         backgroundColor: activeButton === "Today" ? "#DEECFB" : "white",
//                                     },
//                                     boxShadow: 'none'
//                                 }}
//                             >
//                                 Today
//                             </Button>
//                         </Box>

//                     </Box> */}


// </Box>
//             <CustomerList isDashboardPage={false} />
//         </Box>
//     );
// };

import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Skeleton from '@mui/material/Skeleton';

import CustomerList from "../CustomerList/Index";
import CardGrid from "../../utils/CardGrid/CardGrid";
import SalesButton from "../../utils/SalesButtonGroup/BtnGroup";

const cardStyle = {
    height: 120, backgroundColor: '#0064D9', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
}

const iconCss = {
    color: 'white', width: 50, height: 55
}

export const Dashboard = () => {

    const [activeButton, setActiveButton] = useState("All time");

    const cardData = [
        { icon: <PeopleOutlinedIcon sx={iconCss} />, title: "Customers", count: 98 },
        { icon: <DescriptionOutlinedIcon sx={iconCss} />, title: "Invoice", count: 98 },
        { icon: <BugReportOutlinedIcon sx={iconCss} />, title: "Issues", count: 98 },
    ];

    const buttonLabels = ['All time', 'This Year', 'This Week', 'Today'];

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    const buttonStyles = (label) => ({
        margin: '0 2px',
        height: '28px',
        textTransform: 'none',
        color: activeButton === label ? '#0064D9' : '#B3B8BD',
        backgroundColor: activeButton === label ? "#DEECFB" : "white",
        "&:hover": {
            backgroundColor: activeButton === label ? "#DEECFB" : "white",
        },
        boxShadow: 'none'
    });

    return (
        <Box padding={3} backgroundColor={'#F7FBFF'} marginTop={'60px'} >
            <Box>
                <CardGrid cardData={cardData} cardStyle={cardStyle} />
                <Box sx={{
                    backgroundColor: 'white',
                    padding: 2,
                }}>
                    <Typography sx={{
                        textAlign: 'left',
                        letterSpacing: ' 3px',
                        color: '#6B7584',
                        opacity: 1,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        fontSize: 22
                    }}>
                        Lead Sales
                    </Typography>
                    <SalesButton
                        activeButton={activeButton}
                        handleButtonClick={handleButtonClick}
                        buttonLabels={buttonLabels}
                        buttonStyles={buttonStyles}
                    />

                    <Box>
                        <Box sx={{ width: '100%', display: 'flex', height: '400px', justifyContent: 'space-around', transform: 'rotate(180deg)' }}>
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                            <Skeleton sx={{ width: '10px' }} />
                            <Skeleton sx={{ width: '10px' }} animation="wave" />
                            <Skeleton sx={{ width: '10px' }} animation={false} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CustomerList isDashboardPage={false} />
        </Box >
    );
};
