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








export const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState("All time");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllUsers();
          setUsers(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  

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
            <CustomerList rows={users}isDashboardPage={false}/>
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
