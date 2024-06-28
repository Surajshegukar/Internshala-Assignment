import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSellers = createAsyncThunk('fetchSellers', async () => {
    try{
        const response = await fetch('http://localhost:5000/api/seller/getsellers',{
            method: 'GET',
            
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return error;
    }
});

export const addSeller = createAsyncThunk('addSeller', async (seller,{rejectWithValue}) => {
    try{
        const response = await fetch('http://localhost:5000/api/seller/addseller',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(seller)
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
});

export const removeSeller = createAsyncThunk('removeSeller', async (id,{rejectWithValue}) => {
    try{
        const response = await fetch(`http://localhost:5000/api/seller/deleteseller/${id}`,{
            method: 'DELETE',
            
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
});

export const updateSeller = createAsyncThunk('updateSeller', async (seller,{rejectWithValue}) => {
    try{
        const response = await fetch(`http://localhost:5000/api/seller/updateseller/${seller._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(seller)
        });
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
});


export const sellerSlice = createSlice({
    name: "sellers",
    initialState: {
        sellers: [{name:"John Doe",mobile:"1234567890",email:"jhondoe@gmail.com",address:"USA",panNo:"LHOPS5544A",gstNo:"GSTNO123456"}],
        loading: false,
        error: null,
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchSellers.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchSellers.fulfilled, (state, action)=>{
            state.loading = false;
            state.sellers = action.payload;
        });
        builder.addCase(fetchSellers.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addSeller.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(addSeller.fulfilled, (state, action)=>{
            state.loading = false;
            state.sellers.push(action.payload);
        });
        builder.addCase(addSeller.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(removeSeller.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(removeSeller.fulfilled, (state, action)=>{
            state.loading = false;
            state.sellers = state.sellers.filter((seller)=>seller._id !== action.payload);
        });
        builder.addCase(removeSeller.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateSeller.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(updateSeller.fulfilled, (state, action)=>{
            state.loading = false;
            state.sellers = state.sellers.map((seller)=>seller._id === action.payload._id?action.payload:seller);
        });
        builder.addCase(updateSeller.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }   
});

export default sellerSlice.reducer;