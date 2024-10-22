import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null,
    loading: false,
    message: '',
};


export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://depi-back-production.up.railway.app/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

       
            return { token: data.token, user: { email }, message: data.message };
        } catch (error) {
            return rejectWithValue({ message: 'Network error' });
        }
    }
);


export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://depi-back-production.up.railway.app/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return { token: data.token, user: { email, name }, message: data.message };
        } catch (error) {
            return rejectWithValue({ message: 'Network error' });
        }
    }
);
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
            state.message = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
    
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.message = action.payload.message;
                state.user = action.payload.user;
               
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Login failed' };
                state.token = null;
                state.user = null;
                state.message = action.payload?.message || 'Login failed';
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.message = action.payload.message;
                state.user = action.payload.user;
       
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Registration failed' };
                state.token = null;
                state.user = null;
                state.message = action.payload?.message || 'Registration failed';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
