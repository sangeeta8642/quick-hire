import { createSlice } from "@reduxjs/toolkit";


const companySlice = createSlice({
    name: "company",
    initialState: {
        // jobs: [],
        company: [],
        companies: [],
        searchCompanyByText: ""
    },
    reducers: {
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload
        }
        // setAJob: (state, action) => {
        //     state.job = action.payload
        // }
    }
});

export const { setCompany,
    setCompanies,
    setSearchCompanyByText } = companySlice.actions
export default companySlice.reducer


