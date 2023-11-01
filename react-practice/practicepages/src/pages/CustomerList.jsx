// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
// import { getAllUsers } from '../api/api';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// const dpURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'

// const options = [
//   'Edit',
//   'Delete',
// ];

// const columns = [
//   {
//     field: 'id', headerName: 'ID',
//     width: 90,
//     valueGetter: (params) =>
//       `# ${params.row.id || ''}`,
//   },
//   {
//     field: 'updated_at',
//     headerName: 'Date/Time',
//     type: 'number',
//     width: 200,
//   },
//   {
//     field: 'fullname',
//     headerName: 'Full Name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     flex: 1,
//     // valueGetter: (params) =>
//     //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     renderCell: (params) => (
//       <Box style={{ display: 'flex', alignItems: 'center' }}>
//         <Avatar alt={`${params.row.firstName} ${params.row.lastName}`} src={dpURL} />
//         <Typography variant="body1" style={{ marginLeft: '8px' }}>
//           {params.row.fullname}
//         </Typography>
//       </Box>),
//   },
//   {
//     field: 'contactDetails',
//     headerName: 'Contact Details',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 150,
//     valueGetter: (params) =>
//       `${params.row.mobile_no || ''}`,
//   },
//   {
//     field: 'email',
//     headerName: 'Email',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     // flex: 1,
//     width: 300,
//     valueGetter: (params) =>
//       `${params.row.username || ''}`,
//   },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     sortable: false,
//     width: 60,
//     renderCell: (params) => (
//       <div>
//         <IconButton
//           aria-label="more"
//           id="long-button"
//           aria-haspopup="true"
//         // onClick={handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         <Menu

//         >
//           {options.map((option) => (
//             <MenuItem key={option} selected={option === 'Pyxis'} >
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//     ),
//   },
// ];



// const CustomerList = ({ isDashboardPage = true }) => {
//   // const [page, setPage] = useState(0);
//   // const [pageSize, setPageSize] = useState(5)
//   // const pageSize = 5; // Set the default page size
//   const [pagination,setPagination] = useState[{
//     start : 0,
//     limit : 5,
//   }]

//   // useEffect(() => {
//   //   console.log("U")
//   // }, [page, pageSize])
//   const [users, setUsers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // console.log(page,pageSize,'customer se send')
//         const data = await getAllUsers(pagination.start,pagination.limit);
//         console.log(data.records)
//         setUsers(data.records);
//       } catch (error) {
//         // setError(error.message);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchData();
//   }, [pagination]); // insert page and pagesize here

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }




//   return (
//     <Box backgroundColor={"white"} marginTop={"40px"}>
//       <Box padding={2}>
//         <Box margin={"16px 0"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"}>
//           <Typography
//             sx={{
//               textAlign: "left",
//               letterSpacing: "3px",
//               color: "#6B7584",
//               opacity: 1,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//               fontSize: 22,
//             }}
//           >
//             Customer List
//           </Typography>
//           {!isDashboardPage && <Link
//             to='/customer-list'
//             style={{
//               textDecoration: 'none',
//               color: '#6B7584',
//               fontWeight: 'bold',
//               margin: 'auto 0'
//             }}
//           >
//             View All
//           </Link>}
//         </Box>
//         <Divider />
//         <Box margin={"16px 0"}>
//           {isDashboardPage && <TextField
//             placeholder="Search"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           }
//           <Box width={"98%"} marginTop={3}>
//             <DataGrid
//               rows={users}
//               columns={columns}
//               getRowId={(row) => row.id}

//               onPaginationModelChange={(paginationData) => {
//                 paginationData.page = pagination.start;
//                 paginationData.pageSize = pagination.limit
//               }}
//               // page={page}
//               // pageSize={pageSize}
//               rowCount={100}
//               initialState={{
//                 pagination: {
//                   paginationModel: { page: 0, pageSize: 5 },
//                 },
//               }}
//               pageSizeOptions={[3, 5, 10, 15, 20]}
//               checkboxSelection
//               sx={{
//                 fontFamily: "Roboto, sans-serif",
//                 color: "#6B7584",
//                 "& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders , .MuiDataGrid-root": {
//                   borderStyle: "none",
//                 },
//                 "& .MuiDataGrid-footerContainer": {
//                   display: isDashboardPage ? "block" : "none",
//                 },
//               }}
//               style={{
//                 borderStyle: "none",
//               }}

//             />
//             {console.log(pagination.start, pagination.limit, 'lowest console')}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CustomerList;

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { getAllUsers } from '../api/api';
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
    width: 90,
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
    flex: 1,
    // valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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
    // flex: 1,
    width: 300,
    valueGetter: (params) =>
      `${params.row.username || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 60,
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



const CustomerList = ({ isDashboardPage = true }) => {

  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(5)
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5,
  })
  // const pageSize = 5; // Set the default page size


  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(page,pageSize,'customer se send')
        const data = await getAllUsers(pagination.page * pagination.pageSize + 1, pagination.pageSize);
        console.log(data.records, "getting this data in customer list fetchData")
        setUsers(data.records);
      } catch (error) {
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [pagination]); // insert page and pagesize here

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }




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
          {!isDashboardPage && <Link
            to='/customer-list'
            style={{
              textDecoration: 'none',
              color: '#6B7584',
              fontWeight: 'bold',
              margin: 'auto 0'
            }}
          >
            View All
          </Link>}
        </Box>
        <Divider />
        <Box margin={"16px 0"}>
          {isDashboardPage && <TextField
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          }
          <Box width={"98%"} marginTop={3}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.id}

              onPaginationModelChange={(paginationData) => {
                setPagination({
                  ...pagination,
                  page: paginationData.page,
                  pageSize: paginationData.pageSize
                })
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: pagination.page, pageSize: pagination.pageSize },
                },
              }}
              rowCount={100}
              pageSizeOptions={[3, 5, 10, 15, 20]}
              checkboxSelection
              sx={{
                fontFamily: "Roboto, sans-serif",
                color: "#6B7584",
                "& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders , .MuiDataGrid-root": {
                  borderStyle: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  display: isDashboardPage ? "block" : "none",
                },
              }}
              style={{
                borderStyle: "none",
              }}

            />
            {console.log(pagination.page + 1, pagination.pageSize, 'lowest console')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerList;

