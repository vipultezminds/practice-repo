import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { api } from '../../services/api';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const dpURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'

const options = [
  'Edit',
  'Delete',
];

const columns = [
  {
    field: 'id', headerName: 'ID',
    // width: 90,
    valueGetter: (params) =>
      `# ${params.row.id || ''}`,
  },
  {
    field: 'updated_at',
    headerName: 'Date/Time',
    type: 'number',
    width: 200,
  },
  {
    field: 'fullname',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width:300,
    renderCell: (params) => (
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={`${params.row.firstName} ${params.row.lastName}`} src={dpURL} />
        <Typography variant="body1" style={{ marginLeft: '8px' }}>
          {params.row.fullname}
        </Typography>
      </Box>),
  },
  {
    field: 'contactDetails',
    headerName: 'Contact Details',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${params.row.mobile_no || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    // width: 300,
    valueGetter: (params) =>
      `${params.row.username || ''}`,
  },
  {
    field: 'actions',
    headerName: '',
    sortable: false,
    flex:1,

    renderCell: (params) => (
      <Box marginLeft={'auto'}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          sx={{marginLeft:'auto'}}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu>
          {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    ),
  },
];

let count = 0;

const CustomerList = ({ isDashboardPage = true }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // const handlePageSizeChange = (pageSize) => {
  //   console.log('page size change clicked')
  //   // When the page size is changed, set the page to the first page
  //   setPaginationModel({
  //     page: 0,
  //     pageSize: pageSize,
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const start = paginationModel.page * paginationModel.pageSize;
        const limit = paginationModel.pageSize;
        api.getAllUsers(
          start,
          limit,
          searchQuery,
          (data) => {
            if (data && data.records) {
              count = data.count;
              setUsers(data.records);
            } else {
              // Handle the case where the data is not as expected
              console.log('Invalid data received from the server.');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [paginationModel, searchQuery]);



  return (
    <Box backgroundColor={"white"} marginTop={"40px"}>
      <Box padding={2}>
        <Box margin={"16px 0"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"}>
          <Typography
            sx={{
              textAlign: "left",
              letterSpacing: "3px",
              color: "#6B7584",
              opacity: 1,
              fontWeight: "bold",
              fontFamily: "Roboto",
              fontSize: 22,
            }}
          >
            Customer List
          </Typography>
          {!isDashboardPage && (
            <Link
              to='/customer-list'
              style={{
                textDecoration: 'none',
                color: '#6B7584',
                fontWeight: 'bold',
                margin: 'auto 0'
              }}
            >
              View All
            </Link>
          )}
        </Box>
        <Divider />
        <Box margin={"16px 0"}>
          {isDashboardPage && (
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
              onInput={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <Box marginTop={3}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.id}
              paginationMode="server"
              initialState={{
                pagination: { paginationModel: { pageSize:5 } },
              }}
              onPaginationModelChange={(paginationData) => {
                console.log(paginationData);
                setPaginationModel({
                  page: paginationData.page,
                  pageSize: paginationData.pageSize,
                });
              }}
              rowCount={count}
              pageSizeOptions={[5, 10, 15, 20,50]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                width:'99%',
                fontFamily: "Roboto, sans-serif",
                color: "#6B7584",
                "& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders, .MuiDataGrid-root": {
                  // borderStyle: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  display: isDashboardPage ? "block" : "none",
                },
              }}
              style={{
                // borderStyle: "none",
              }}
              // onRowSelectionModelChange={handlePageSizeChange}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerList;