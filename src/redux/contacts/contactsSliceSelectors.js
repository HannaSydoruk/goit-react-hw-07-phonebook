import { createSelector } from '@reduxjs/toolkit';

const selectContacts = (store) => store.contacts;

export const selectContactsItems = createSelector(
    selectContacts,
    contacts => contacts.items
);

export const selectContactsFilter = createSelector(
    selectContacts,
    store => store.filter
)

export const selectFilteredContacts = createSelector(
    [selectContactsItems, selectContactsFilter],
    (contacts, filter) => {
        return contacts.filter(contact => {
            return contact.name
                .toLowerCase()
                .includes(filter.trim().toLocaleLowerCase());
        })
    });