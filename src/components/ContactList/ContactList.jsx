import { ContactListItem } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchAll } from '../../redux/contacts/contactsSlice';
import css from './ContactList.module.css';
import { useEffect } from 'react';
import { selectFilteredContacts } from '../../redux/contacts/contactsSliceSelectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

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
