import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "applicantions",
    initialState: {
        applicants: []
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload
        },
        // setUser: (state, action) => {
        //     state.user = action.payload
        // }
    }
})

export const { setApplicants } = applicationSlice.actions
export default applicationSlice.reducer