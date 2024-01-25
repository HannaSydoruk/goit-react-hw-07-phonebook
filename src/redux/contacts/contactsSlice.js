import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContact, postContact, requestContacts } from "services/api";
import { STATUSES } from "utils/constants";

const initialState = {
    contacts: [],
    filter: '',
    status: STATUSES.idle,
    error: null,
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

export const apiDeleteContact = createAsyncThunk(
    'contacts/apiDeleteContact',
    async (contactId, thunkApi) => {
        try {
            const contacts = await deleteContact(contactId);
            return contacts; // Action Payload
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const apiAddContact = createAsyncThunk(
    'contacts/apiAddContact',
    async (contact, thunkApi) => {
        try {
            const newContact = await postContact(contact);
            return newContact; // Action Payload
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

            .addCase(apiDeleteContact.pending, (state, action) => {
                state.status = STATUSES.pending;
                state.error = null;
            })
            .addCase(apiDeleteContact.fulfilled, (state, action) => {
                state.status = STATUSES.success;
                state.contacts = state.contacts.filter(
                    contact => contact.id !== action.payload.id
                )
            })
            .addCase(apiDeleteContact.rejected, (state, action) => {
                state.status = STATUSES.error;
                state.error = action.payload;
            })

            .addCase(apiAddContact.pending, (state, action) => {
                state.status = STATUSES.pending;
                state.error = null;
            })
            .addCase(apiAddContact.fulfilled, (state, action) => {
                state.status = STATUSES.success;
                state.contacts = [...state.contacts, action.payload];
            })
            .addCase(apiAddContact.rejected, (state, action) => {
                state.status = STATUSES.error;
                state.error = action.payload;
            })
});

// Генератори екшенів
export const { setFilter } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
