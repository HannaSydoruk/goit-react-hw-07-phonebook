import { ContactListItem } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchAll } from '../../redux/contacts/contactsSlice';
import css from './ContactList.module.css';
import { useEffect } from 'react';

export const ContactList = () => {
  const contacts = useSelector(store => store.contacts.items);
  const filter = useSelector(store => store.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact => {
    return contact.name
      .toLowerCase()
      .includes(filter.trim().toLocaleLowerCase());
  });

  const onDeleteHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <ul className={css.contactlist}>
        {filteredContacts.map(contact => {
          return (
            <ContactListItem
              contact={contact}
              key={contact.id}
              onDeleteHandler={onDeleteHandler}
            />
          );
        })}
      </ul>
    </>
  );
};
