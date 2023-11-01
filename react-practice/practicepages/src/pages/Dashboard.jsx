import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Skeleton from '@mui/material/Skeleton';

import CustomerList from "./CustomerList";
import { getAllUsers } from "../api/api";


const cardStyle = {
    height: 120, backgroundColor: '#0064D9', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
}

const iconCss = {
    color: 'white', width: 50, height: 55
}

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

export const Dashboard = () => {

    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState("All time");
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const data = await getAllUsers();
    //       setUsers(data);
    //     } catch (error) {
    //       setError(error.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchData();
    // }, []);
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (error) {
    //   return <div>Error: {error}</div>;
    // }
  

    const cardData = [
        { icon: <PeopleOutlinedIcon sx={iconCss} />, title: "Customers", count: 98 },
        { icon: <DescriptionOutlinedIcon sx={iconCss} />, title: "Invoice", count: 98 },
        { icon: <BugReportOutlinedIcon sx={iconCss} />, title: "Issues", count: 98 },
    ];

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <Box padding={3} backgroundColor={'#F7FBFF'} marginTop={'60px'} >
            <Box>
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

                    <Box marginTop={2}>
                        <Button
                            onClick={() => handleButtonClick("All time")}
                            sx={{
                                margin: '0 2px',
                                height: '28px',
                                color: activeButton === "All time" ? '#0064D9' : '#B3B8BD',
                                textTransform: 'none',
                                backgroundColor: activeButton === "All time" ? "#DEECFB" : "white",
                                "&:hover": {
                                    backgroundColor: activeButton === "All time" ? "#DEECFB" : "white",
                                },
                                boxShadow: 'none'
                            }}
                        >
                            All time
                        </Button>
                        <Button
                            onClick={() => handleButtonClick("This Year")}
                            sx={{
                                margin: '0 2px',
                                height: '28px',
                                textTransform: 'none',
                                color: activeButton === "This Year" ? '#0064D9' : '#B3B8BD',
                                backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
                                "&:hover": {
                                    backgroundColor: activeButton === "This Year" ? "#DEECFB" : "white",
                                },
                                boxShadow: 'none'
                            }}
                        >
                            This Year
                        </Button>
                        <Button
                            onClick={() => handleButtonClick("This Week")}
                            sx={{
                                margin: '0 2px',
                                height: '28px',
                                textTransform: 'none',
                                color: activeButton === "This Week" ? '#0064D9' : '#B3B8BD',
                                backgroundColor: activeButton === "This Week" ? "#DEECFB" : "white",
                                "&:hover": {
                                    backgroundColor: activeButton === "This Week" ? "#DEECFB" : "white",
                                },
                                boxShadow: 'none'
                            }}
                        >
                            This Week
                        </Button>
                        <Button
                            onClick={() => handleButtonClick("Today")}
                            sx={{
                                margin: '0 2px',
                                height: '28px',
                                textTransform: 'none',
                                color: activeButton === "Today" ? '#0064D9' : '#B3B8BD',
                                backgroundColor: activeButton === "Today" ? "#DEECFB" : "white",
                                "&:hover": {
                                    backgroundColor: activeButton === "Today" ? "#DEECFB" : "white",
                                },
                                boxShadow: 'none'
                            }}
                        >
                            Today
                        </Button>

                    </Box>
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
            <CustomerList users={users} isDashboardPage={false}/>
            {/* <Box marginTop={'40px'} backgroundColor={'white'}>
                <Box padding={2} >
                    <Box margin={'16px 0'} backgroundColor={'white'}>
                        <Typography sx={{
                            textAlign: 'left',
                            letterSpacing: ' 3px',
                            color: '#6B7584',
                            opacity: 1,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            // variant:'h1',
                            fontSize: 22
                        }}>
                            Customer List
                        </Typography>
                    </Box>
                    <Divider />
                    <Box margin={'16px 0'}>
                        <TextField
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Box width={"98%"} marginTop={3}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.id} // Add this line
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                // sort
                                pageSizeOptions={[3, 5, 10, 15, 20]}
                                checkboxSelection
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    color: '#6B7584',
                                    '& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders , .MuiDataGrid-root': {
                                        // borderStyle: 'none',
                                        // borderBottom: 'none',
                                        // borderRadius: 'none',
                                    },
                                }}
                                style={{
                                    // borderStyle: 'none',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box> */}
        </Box>
    );
};
