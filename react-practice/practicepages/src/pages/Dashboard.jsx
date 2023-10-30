import { Box, Button, ButtonGroup, Grid, Input, Paper, Stack, TextField, Typography, formHelperTextClasses } from "@mui/material";
import React, { useState } from "react";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const options = [
    'Edit',
    'Delete',
];

const ITEM_HEIGHT = 48;


const cardStyle = {
    height: 120, backgroundColor: '#0064D9', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
}

const iconCss = {
    color: 'white', width: 50, height: 55
}

const dpURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'


const columns = [
    { field: 'id', headerName: 'ID', },
    { field: 'firstName', headerName: 'First name', flex: 1, },
    { field: 'lastName', headerName: 'Last name', flex: 1, },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        // width: 100

    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        // valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: (params) => (
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={`${params.row.firstName} ${params.row.lastName}`} src={dpURL} />
                <Typography variant="body1" style={{ marginLeft: '8px' }}>
                    {params.row.firstName} {params.row.lastName}
                </Typography>
            </Box>),
    },
    {
        field: 'contactDetails',
        headerName: 'Contact Details',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.mobile || ''}`,
    },
    {
        field: 'email',
        headerName: 'Email',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (params) =>
            `${params.row.email || ''}`,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    // onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu

                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        ),
    },


];

const rows = [
    { id: 1, lastName: 'Smith', firstName: 'John', age: 32, mobile: '555-111-1111', email: 'john.smith@example.com' },
    { id: 2, lastName: 'Johnson', firstName: 'Sarah', age: 28, mobile: '555-222-2222', email: 'sarah.johnson@example.com' },
    { id: 3, lastName: 'Williams', firstName: 'Michael', age: 45, mobile: '555-333-3333', email: 'michael.williams@example.com' },
    { id: 4, lastName: 'Brown', firstName: 'Emily', age: 26, mobile: '555-444-4444', email: 'emily.brown@example.com' },
    { id: 5, lastName: 'Jones', firstName: 'David', age: 38, mobile: '555-555-5555', email: 'david.jones@example.com' },
    { id: 6, lastName: 'Davis', firstName: 'Anna', age: 31, mobile: '555-666-6666', email: 'anna.davis@example.com' },
    { id: 7, lastName: 'Miller', firstName: 'Matthew', age: 40, mobile: '555-777-7777', email: 'matthew.miller@example.com' },
    { id: 8, lastName: 'Wilson', firstName: 'Olivia', age: 27, mobile: '555-888-8888', email: 'olivia.wilson@example.com' },
    { id: 9, lastName: 'Moore', firstName: 'James', age: 50, mobile: '555-999-9999', email: 'james.moore@example.com' },
    { id: 10, lastName: 'Taylor', firstName: 'Sophia', age: 35, mobile: '555-101-0101', email: 'sophia.taylor@example.com' },
    { id: 11, lastName: 'Anderson', firstName: 'William', age: 48, mobile: '555-202-0202', email: 'william.anderson@example.com' },
    { id: 12, lastName: 'Harris', firstName: 'Ava', age: 29, mobile: '555-303-0303', email: 'ava.harris@example.com' },
    { id: 13, lastName: 'Jackson', firstName: 'Daniel', age: 33, mobile: '555-404-0404', email: 'daniel.jackson@example.com' },
    { id: 14, lastName: 'White', firstName: 'Liam', age: 34, mobile: '555-505-0505', email: 'liam.white@example.com' },
    { id: 15, lastName: 'Martinez', firstName: 'Mia', age: 24, mobile: '555-606-0606', email: 'mia.martinez@example.com' },
    { id: 16, lastName: 'Jones', firstName: 'Ethan', age: 37, mobile: '555-707-0707', email: 'ethan.jones@example.com' },
    { id: 17, lastName: 'Lee', firstName: 'Lily', age: 30, mobile: '555-808-0808', email: 'lily.lee@example.com' },
    { id: 18, lastName: 'Garcia', firstName: 'Samuel', age: 42, mobile: '555-909-0909', email: 'samuel.garcia@example.com' },
    { id: 19, lastName: 'Davis', firstName: 'Sophia', age: 31, mobile: '555-101-0101', email: 'sophia.davis@example.com' },
    { id: 20, lastName: 'Hernandez', firstName: 'Daniel', age: 39, mobile: '555-111-1111', email: 'daniel.hernandez@example.com' },
    { id: 21, lastName: 'Brown', firstName: 'Olivia', age: 44, mobile: '555-121-2121', email: 'olivia.brown@example.com' },
    { id: 22, lastName: 'Wilson', firstName: 'Benjamin', age: 35, mobile: '555-131-3131', email: 'benjamin.wilson@example.com' },
    { id: 23, lastName: 'Clark', firstName: 'Sophia', age: 28, mobile: '555-141-4141', email: 'sophia.clark@example.com' },
    { id: 24, lastName: 'Hall', firstName: 'Ethan', age: 47, mobile: '555-151-5151', email: 'ethan.hall@example.com' },
    { id: 25, lastName: 'Young', firstName: 'Isabella', age: 32, mobile: '555-161-6161', email: 'isabella.young@example.com' },
    { id: 26, lastName: 'Harris', firstName: 'Aiden', age: 36, mobile: '555-171-7171', email: 'aiden.harris@example.com' },
    { id: 27, lastName: 'Thomas', firstName: 'Emma', age: 25, mobile: '555-181-8181', email: 'emma.thomas@example.com' },
    { id: 28, lastName: 'Harris', firstName: 'Mason', age: 29, mobile: '555-191-9191', email: 'mason.harris@example.com' },
    { id: 29, lastName: 'Wright', firstName: 'Olivia', age: 30, mobile: '555-202-0202', email: 'olivia.wright@example.com' },
    { id: 30, lastName: 'Scott', firstName: 'Lucas', age: 33, mobile: '555-212-1212', email: 'lucas.scott@example.com' },
    { id: 31, lastName: 'King', firstName: 'Charlotte', age: 36, mobile: '555-222-2222', email: 'charlotte.king@example.com' },
    { id: 32, lastName: 'Ward', firstName: 'Ethan', age: 31, mobile: '555-232-3232', email: 'ethan.ward@example.com' },
    { id: 33, lastName: 'Baker', firstName: 'Ava', age: 29, mobile: '555-242-4242', email: 'ava.baker@example.com' },
    { id: 34, lastName: 'Gonzalez', firstName: 'Liam', age: 43, mobile: '555-252-5252', email: 'liam.gonzalez@example.com' },
    { id: 35, lastName: 'Roberts', firstName: 'Sophia', age: 27, mobile: '555-262-6262', email: 'sophia.roberts@example.com' },
    { id: 36, lastName: 'Lee', firstName: 'Mason', age: 34, mobile: '555-272-7272', email: 'mason.lee@example.com' },
    { id: 37, lastName: 'Garcia', firstName: 'Aria', age: 35, mobile: '555-282-8282', email: 'aria.garcia@example.com' },
    { id: 38, lastName: 'Davis', firstName: 'Oliver', age: 40, mobile: '555-292-9292', email: 'oliver.davis@example.com' },
    { id: 39, lastName: 'Rodriguez', firstName: 'Emma', age: 32, mobile: '555-303-0303', email: 'emma.rodriguez@example.com' },
    { id: 40, lastName: 'Hernandez', firstName: 'Ethan', age: 39, mobile: '555-313-1313', email: 'ethan.hernandez@example.com' },
    { id: 41, lastName: 'Smith', firstName: 'Olivia', age: 28, mobile: '555-323-2323', email: 'olivia.smith@example.com' },
    { id: 42, lastName: 'Young', firstName: 'Noah', age: 31, mobile: '555-333-3333', email: 'noah.young@example.com' },
    { id: 43, lastName: 'Hall', firstName: 'Ava', age: 29, mobile: '555-343-4343', email: 'ava.hall@example.com' },
    { id: 44, lastName: 'Johnson', firstName: 'Liam', age: 33, mobile: '555-353-5353', email: 'liam.johnson@example.com' },
    { id: 45, lastName: 'Clark', firstName: 'Mia', age: 30, mobile: '555-363-6363', email: 'mia.clark@example.com' },
    { id: 46, lastName: 'Martin', firstName: 'Benjamin', age: 37, mobile: '555-373-7373', email: 'benjamin.martin@example.com' },
    { id: 47, lastName: 'Wright', firstName: 'Isabella', age: 35, mobile: '555-383-8383', email: 'isabella.wright@example.com' },
    { id: 48, lastName: 'Taylor', firstName: 'Mason', age: 32, mobile: '555-393-9393', email: 'mason.taylor@example.com' },
    { id: 49, lastName: 'Martinez', firstName: 'Olivia', age: 40, mobile: '555-404-0404', email: 'olivia.martinez@example.com' },
    { id: 50, lastName: 'Adams', firstName: 'Ethan', age: 38, mobile: '555-414-1414', email: 'ethan.adams@example.com' },
];




export const Dashboard = () => {




    const cardData = [
        { icon: <PeopleOutlinedIcon sx={iconCss} />, title: "Customers", count: 98 },
        { icon: <DescriptionOutlinedIcon sx={iconCss} />, title: "Invoice", count: 98 },
        { icon: <BugReportOutlinedIcon sx={iconCss} />, title: "Issues", count: 98 },
    ];
    const [activeButton, setActiveButton] = useState("All time");

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query  
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter((row) =>
        Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );


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
                        // variant:'h1',
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
                        <Box sx={{ width: '100%', display: 'flex', height: '400px', width: '100%', justifyContent: 'space-around', transform: 'rotate(180deg)' }}>
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
            <Box marginTop={'40px'} backgroundColor={'white'}>
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
                        {/* <TextField
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        /> */}
                        {/* <TextField
                        
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
                        /> */}
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

                        {/* <Box width={"98%"}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[3, 5, 10, 15, 20]}
                                checkboxSelection
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    color: '#6B7584',
                                    '& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders , .MuiDataGrid-root': {
                                        borderStyle: 'none',
                                        borderBottom: 'none',
                                        borderRadius: 'none'
                                    },
                                }}
                                style={{
                                    borderStyle: 'none',
                                }}
                            />
                        </Box> */}
                        <Box width={"98%"}>
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowId={(row) => row.id} // Add this line
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[3, 5, 10, 15, 20]}
                                checkboxSelection
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    color: '#6B7584',
                                    '& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders , .MuiDataGrid-root': {
                                        borderStyle: 'none',
                                        borderBottom: 'none',
                                        borderRadius: 'none',
                                    },
                                }}
                                style={{
                                    borderStyle: 'none',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
