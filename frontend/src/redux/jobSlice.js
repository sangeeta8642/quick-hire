import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        job: [],
        jobs: [],
        adminJobs: [],
        appliedJobs: [],
        searchedQuery: "",
        searchJobByText: "",
    },
    reducers: {
        setAJob: (state, action) => {
            state.job = action.payload
        },
        setAllJobs: (state, action) => {
            state.jobs = action.payload
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
    }
});

export const {
    setAJob,
    setAllJobs,
    setAdminJobs,
    setAppliedJobs,
    setSearchedQuery,
    setSearchJobByText
} = jobSlice.actions

export default jobSlice.reducer


