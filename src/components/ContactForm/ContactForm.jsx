import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsSlice';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const formKey = { name: setName, number: setNumber };
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);

  const onChangeHandler = e => {
    const { name, value } = e.currentTarget;
    formKey[name](_ => value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === name.toLocaleLowerCase()
    );
    if (hasDuplicates) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const action = addContact(contact);
    dispatch(action);
    reset();
  };

  return (
    <form onSubmit={formSubmitHandler} className={css['form-input']}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChangeHandler}
        placeholder="Name"
        id={nanoid()}
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={onChangeHandler}
        placeholder="Phone"
        id={nanoid()}
        required
      />
      <button type="submit" className={css['form-button']}>
        Add contact
      </button>
    </form>
  );
};
