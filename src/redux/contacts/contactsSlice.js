import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestContacts } from "services/api";
import { STATUSES } from "utils/constants";

const initialState = {
    contacts: [],
    filter: '',
    status: STATUSES.idle
}

export const apiGetContacts = createAsyncThunk(
    'contacts/apiGetContacts',
    async (_, thunkApi) => {
        try {
            const contacts = await requestContacts();
            return contacts; // Action Payload
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const contactsSlice = createSlice({
    // Ім'я слайсу
    name: "contacts",
    // Початковий стан редюсера слайсу
    initialState,
    // Об'єкт редюсерів
    reducers: {
        addContact(state, action) {
            state.contacts = [...state.contacts, action.payload];
        },
        removeContact(state, action) {
            state.contacts = state.contacts.filter(
                contact => contact.id !== action.payload
            )
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(apiGetContacts.pending, (state, action) => {
                state.status = STATUSES.pending;
                state.error = null;
            })
            .addCase(apiGetContacts.fulfilled, (state, action) => {
                state.status = STATUSES.success;
                state.contacts = action.payload;
            })
            .addCase(apiGetContacts.rejected, (state, action) => {
                state.status = STATUSES.error;
                state.error = action.payload;
            })
});

// Генератори екшенів
export const { addContact, removeContact, setFilter } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
