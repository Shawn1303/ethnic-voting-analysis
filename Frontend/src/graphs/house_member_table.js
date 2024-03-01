import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function HouseMemberTable() {
  // dummy data for virginia
  const houseMembers = [
    {
      "first_name": "Anthony",
      "last_name": "Bonita G.",
      "house_district": "92nd",
      "party": "D",
      "race": "African American",
      "gender": "Male"
    },
    {
      "first_name": "Jonathan E.",
      "last_name": "Arnold",
      "house_district": "46th",
      "party": "R",
      "race": "Caucasian",
      "gender": "Female"
    },
    {
      "first_name": "Alex Q.",
      "last_name": "Askew",
      "house_district": "95th",
      "party": "D",
      "race": "Asian",
      "gender": "Male"
    },
    {
      "first_name": "Terry L.",
      "last_name": "Austin",
      "house_district": "37th",
      "party": "R",
      "race": "Hispanic",
      "gender": "Female"
    },
    {
      "first_name": "Jason S.",
      "last_name": "Ballard",
      "house_district": "42nd",
      "party": "R",
      "race": "Native American",
      "gender": "Male"
    },
    {
      "first_name": "Amanda E.",
      "last_name": "Batten",
      "house_district": "71st",
      "party": "R",
      "race": "Other",
      "gender": "Female"
    },
    {
      "first_name": "Elizabeth B.",
      "last_name": "Bennett-Parker",
      "house_district": "5th",
      "party": "D",
      "race": "Caucasian",
      "gender": "Male"
    },
    {
      "first_name": "Robert S., Jr.",
      "last_name": "Bloxom",
      "house_district": "100th",
      "party": "R",
      "race": "Hispanic",
      "gender": "Female"
    },
    {
      "first_name": "David L.",
      "last_name": "Bulova",
      "house_district": "11th",
      "party": "D",
      "race": "African American",
      "gender": "Male"
    },
    {
      "first_name": "Katrina E.",
      "last_name": "Callsen",
      "house_district": "54th",
      "party": "D",
      "race": "Asian",
      "gender": "Female"
    }
  ]
  
  const rows = houseMembers.map((member,index)=> ({
    id: index + 1,
    first_name: member.first_name,
    last_name: member.last_name,
    house_district: member.house_district,
    party: member.party,
    race: member.race,
    gender: member.gender,
    minority_status: member.race === 'Caucasian' ? 'N' : 'Y',
  }))

  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'house_district', headerName: 'House District', width: 150 },
    { field: 'party', headerName: 'Party', width: 100 },
    { field: 'race', headerName: 'Race', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'minority_status', headerName: 'Minority Status', width: 150 },
  ]
  return <div style={{ height: 500, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSize={10} />
  </div>

}
