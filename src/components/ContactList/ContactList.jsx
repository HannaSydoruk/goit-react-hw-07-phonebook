import { ContactListItem } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contacts/contactsSlice';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact => {
    return contact.name
      .toLowerCase()
      .includes(filter.trim().toLocaleLowerCase());
  });

  const onDeleteHandler = contactId => {
    const action = removeContact(contactId);
    dispatch(action);
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
