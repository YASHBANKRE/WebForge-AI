import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null
    },
    reducers: {
        setUserData : (state, action) => {
            state.userData = action.payload;
        }
    }
})

//function ko export isliye kar rahe hai taki hum isko use kar sakein
export const {setUserData} = userSlice.actions;

//reducer ko export isliye kar rahe hai taki hum isko store mei use kar sakein
export default userSlice.reducer;