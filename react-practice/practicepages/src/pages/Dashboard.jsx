// import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
// import React from "react";
// import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

// const cardStyle = {
//     height: 120, backgroundColor: '#0064D9', borderRadius: 5, margin: '0 8px', display:'flex', justifyContent:'space-between',
// }

// export const Dashboard = () => {
//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={4}>
//                 <Paper sx={cardStyle}>
//                     <Stack margin={'auto 15px'}>
//                         <PeopleOutlinedIcon
//                             sx={{
//                                 color: 'white',
//                                 width: 50,
//                                 height: 55,
//                             }}
//                         />
//                         <Typography
//                             sx={{
//                                 fontFamily: 'Roboto',
//                                 fontWeight: 'Bold',
//                                 color: 'white'
//                             }}
//                         >Customers
//                         </Typography>
//                     </Stack>
//                     <Typography margin={'auto 15px'} fontWeight={'bold'} color={"white"} fontSize={30}>
//                         98
//                     </Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={4}>
//                 <Paper sx={cardStyle}>
//                     <Stack margin={'auto 15px'}>
//                         <DescriptionOutlinedIcon
//                             sx={{
//                                 color: 'white',
//                                 width: 50,
//                                 height: 55,
//                             }}
//                         />
//                         <Typography
//                             sx={{
//                                 fontFamily: 'Roboto',
//                                 fontWeight: 'Bold',
//                                 color: 'white',
//                                 fontSize:18
//                             }}
//                         >Invoice
//                         </Typography>
//                     </Stack>
//                     <Typography margin={'auto 15px'} fontWeight={'bold'} color={"white"} fontSize={30}>
//                         98
//                     </Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={4}>
//                 <Paper sx={cardStyle}>
//                     <Stack margin={'auto 15px'}>
//                         <BugReportOutlinedIcon
//                             sx={{
//                                 color: 'white',
//                                 width: 50,
//                                 height: 55,
//                             }}
//                         />
//                         <Typography
//                             sx={{
//                                 fontFamily: 'Roboto',
//                                 fontWeight: 'Bold',
//                                 color: 'white'
//                             }}
//                         >Issues
//                         </Typography>
//                     </Stack>
//                     <Typography margin={'auto 15px'} fontWeight={'bold'} color={"white"} fontSize={30}>
//                         98
//                     </Typography>
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

const cardStyle = {
    height: 120, backgroundColor: '#0064D9', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
}

export const Dashboard = () => {
    const cardData = [
        { icon: <PeopleOutlinedIcon sx={{ color: 'white', width: 50, height: 55 }} />, title: "Customers", count: 98 },
        { icon: <DescriptionOutlinedIcon sx={{ color: 'white', width: 50, height: 55 }} />, title: "Invoice", count: 98 },
        { icon: <BugReportOutlinedIcon sx={{ color: 'white', width: 50, height: 55 }} />, title: "Issues", count: 98 },
    ];

    return (
        <Stack padding={3} backgroundColor={'#F7FBFF'} marginTop={'1px'} >
            <Stack>
                <Grid container spacing={2} >
                    {cardData.map((data, index) => (
                        <Grid item xs={4} key={index} paddingBottom={3}>
                            <Paper sx={cardStyle}>
                                <Stack margin={'auto 15px'}>
                                    {data.icon}
                                    <Typography
                                        sx={{
                                            fontFamily: 'Roboto',
                                            fontWeight: 'Bold',
                                            color: 'white',
                                        }}
                                    >
                                        {data.title}
                                    </Typography>
                                </Stack>
                                <Typography margin={'auto 15px'} fontWeight={'bold'} color={"white"} fontSize={30}>
                                    {data.count}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Stack sx={{
                    border: '2px solid black',
                    height: 500,
                    backgroundColor: 'white',
                    padding: 2,
                }}>
                    <Typography sx={{
                        textAlign: 'left',
                        letterSpacing: ' 0.63px',
                        color: '#6B7584',
                        opacity: 1,
                        fontWeight: 'bold',
                        fontFamily:'Roboto',
                    }}>
                        Lead Sales
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
