import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/contactsSlice';
import css from './Filter.module.css';
import { selectContactsFilter } from '../../redux/contacts/contactsSliceSelectors';

export const Filter = () => {
  const filter = useSelector(selectContactsFilter);
  const dispatch = useDispatch();

  const onChangeFilter = e => {
    const value = e.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <>
      <p>Find contacts by name:</p>
      <input
        type="text"
        value={filter}
        name="keywords"
        placeholder="Enter Name here..."
        className={css['input-filter']}
        onChange={onChangeFilter}
      />
    </>
  );
};
