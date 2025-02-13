import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchInvoices = createAsyncThunk('fetchInvoices', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/invoice/getallinvoices', {
            method: 'GET',
            headers: {
                
            }
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error;
    }
});

export const addInvoice = createAsyncThunk('addInvoice', async (invoice, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/api/invoice/addinvoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(invoice)
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});

export const removeInvoice = createAsyncThunk('removeInvoice', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/invoice/deleteinvoice/${id}`, {
            method: 'DELETE',
            
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});

export const updateInvoice = createAsyncThunk('updateInvoice', async (invoice, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/invoice/updateinvoice/${invoice._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(invoice)
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});


const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoices: [{
            invoiceNo: 1,
            customerName: "John Doe",
            customerEmail: "johndoe@gmail.com",
            customerAddress: "USA",
            customerMobile: "1111222233",
            date: "2021-10-10",
            dueDate: "2021-10-20",
            products: [{
                productName: "Product 1",
                quantity: 1,
                price: 100
            }],
            status: "Cancelled",
        }],
        loading: false,
        error: null

    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvoices.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload;
        });
        builder.addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addInvoice.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices.push(action.payload);
        });
        builder.addCase(addInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(removeInvoice.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(removeInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = state.invoices.filter((invoice) => invoice._id !== action.payload._id);
        });
        builder.addCase(removeInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateInvoice.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = state.invoices.map((invoice) => invoice._id === action.payload._id ? action.payload : invoice);
        });
        builder.addCase(updateInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export default invoiceSlice.reducer;
