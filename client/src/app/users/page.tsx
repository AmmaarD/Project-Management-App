"use client";
import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  Toolbar,
  ToolbarButton,
  FilterPanelTrigger,
  ColumnsPanelTrigger,
  QuickFilter,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear,
} from "@mui/x-data-grid";

import clsx from 'clsx';

import FilterListIcon from '@mui/icons-material/FilterList'
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

function Button(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'flex h-9 items-center justify-center rounded border border-neutral-200 cursor-pointer dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 text-sm font-bold text-neutral-700 dark:text-neutral-200 whitespace-nowrap select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 active:bg-neutral-100 dark:active:bg-neutral-700',
        props.className,
      )}
    />
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        ' h-[28.6px] w-full rounded border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 px-2.5 text-base text-neutral-900 dark:text-neutral-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600',
        props.className,
      )}
    />
  );
}

function QuickSearchButton() {
  return (
    <QuickFilter
      render={(props, state) => (
        <div {...props} className="flex items-center overflow-clip pr-4">
          <QuickFilterTrigger
            className={state.expanded ? 'rounded-r-none border-r-0' : ''}
            render={
              <ToolbarButton
                style={{
                  height: '28.6px',
                  color: '#0275ff',
                  fontSize: '0.9rem',
                  fontFamily: 'sans-serif',
                  // textTransform: 'uppercase',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px', 
                  border: '1px solid #d1d5db',
                  paddingTop: '3px', 
                  paddingBottom: '3px', 
                  marginTop: '16px',
                  marginBottom: '16px',
                }}
                render={
                  <Button aria-label="Search" className="bg-white h-9">
                    <SearchIcon fontSize="small" className="#0275ff"/>
                  </Button>
                }
              />
            }
          />

          <div
            className={clsx(
              'flex overflow-clip transition-all duration-300 ease-in-out',
              state.expanded ? 'w-48' : 'w-0',
            )}
          >
            <QuickFilterControl
              placeholder="Search"
              aria-label="Search"
              render={({ slotProps, size, ...controlProps }) => (
                <TextInput
                  {...controlProps}
                  {...slotProps?.htmlInput}
                  className={clsx(
                    'flex-1 rounded-l-none',
                    state.expanded && state.value !== '' && 'rounded-r-none',
                  )}
                />
              )}
            />

            {state.expanded && state.value !== '' && (
              <QuickFilterClear
                render={
                  <Button aria-label="Clear" className="group rounded-l-none bg-white h-[28.6px] dark:bg-dark ">
                    <div className="p-1 bg-white group-hover:bg-inherit dark:bg-inherit dark:group-hover:bg-inherit">
                      <CancelIcon fontSize="small" className=" text-[#0275ff]"/>
                    </div>
                  </Button>
                }
              />
            )}
          </div>
        </div>
      )}
    />
  );
}

const CustomToolbar = () => (
  <Toolbar 
    style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '12px',
          paddingTop: '32px',
          paddingBottom: '32px',
          paddingLeft: '16px'
        }}>
  <FilterPanelTrigger
    render={
      <ToolbarButton
        style={{
          color: '#0275ff',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif',
          // textTransform: 'uppercase',
          fontWeight: 'bold',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px', 
          border: '1px solid #d1d5db',
          paddingTop: '3px', 
          paddingBottom: '3px', 
          marginTop: '16px',
          marginBottom: '16px',
        }}
      />
    }
  >
    <FilterListIcon />
    Filter
  </FilterPanelTrigger>
  <ColumnsPanelTrigger
    render={
      <ToolbarButton
        style={{
          color: '#0275ff',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif',
          // textTransform: 'uppercase',
          fontWeight: 'bold',
          borderRadius: '4px',
          border: '1px solid #d1d5db',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          paddingTop: '3px', 
          paddingBottom: '3px'        
        }}
      />
    }
  >
    <ViewColumnIcon />
    Columns
  </ColumnsPanelTrigger>
  <QuickSearchButton />
</Toolbar>
);

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`https://project-mgmt-s3-images.s3.us-east-1.amazonaws.com/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          showToolbar
        />
      </div>
    </div>
  );
};

export default Users;




