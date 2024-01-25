import css from './ContactListItem.module.css';
export const ContactListItem = ({ contact, onDeleteHandler }) => {
  return (
    <li className={css['contact-list']}>
      <span className={css.name}>{contact.name}</span>
      <span className={css.phone}>
        {contact.number}
        <button
          className={css['delete-btn']}
          onClick={() => onDeleteHandler(contact.id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
};
