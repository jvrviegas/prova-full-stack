import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { MdAdd } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import { Container, Category } from './styles';

export default function Categories({ history }) {
  const [categories, setCategories] = useState([]);

  const dateFormatted = useMemo(
    () => format(new Date(), "d 'de' MMMM", { locale: pt }),
    []
  );

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories');

      setCategories(response.data);
    }

    loadCategories();
  }, [dateFormatted]);

  return (
    <Container>
      <header>
        <strong>{dateFormatted}</strong>
        <button
          type="button"
          onClick={() => history.push('/categories/create')}
        >
          <MdAdd size={24} color="#3b4552" />
          Nova categoria
        </button>
      </header>

      <ul>
        {categories.map((category) => (
          <Category key={category.id}>
            <strong>{category.name}</strong>
          </Category>
        ))}
      </ul>
    </Container>
  );
}

Categories.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
