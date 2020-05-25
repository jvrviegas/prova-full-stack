/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Input from '~/components/Input';
import DatePicker from '~/components/DatePicker';
import AsyncSelect from './AsyncSelect';

import { Container, Content } from './styles';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#eee',
    minHeight: '40px',
    height: '40px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
};

export default function TodoForm({ history }) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formRef = useRef();

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories');

      const data = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      setCategories(data);
    }

    loadCategories();
  }, []);

  const filterData = (inputValue, array) => {
    return array.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const recipientOptions = (inputValue) =>
    new Promise((resolve) => {
      resolve(filterData(inputValue, categories));
    });

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('O título é obrigatório'),
        description: Yup.string().required('A descrição é obrigatória'),
        start_date: Yup.date().required('A data de início é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const { title, description, category, start_date, end_date } = data;

      await api.post('/todos', {
        title,
        description,
        category_id: category,
        start_date,
        end_date,
      });

      toast.success('Tarefa criada com sucesso');
      history.push('/');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }

      if (err.response) toast.error(err.response.data.error);
    }
  }

  function handleCategoryChange(value) {
    setCurrentCategory(value);
  }

  return (
    <Container>
      <header>
        <strong>Criar tarefa</strong>
      </header>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="title">Título</label>
          <Input
            id="title"
            name="title"
            type="title"
            placeholder="Reunião com gestor"
          />

          <label htmlFor="description">Descrição</label>
          <Input
            id="description"
            name="description"
            type="description"
            placeholder="Conversar com o Marcelo sobre o relatório mensal"
          />

          <label htmlFor="category">Categoria</label>
          <AsyncSelect
            id="category"
            name="category"
            cacheOptions
            inputValue={currentCategory}
            onInputChange={handleCategoryChange}
            loadOptions={recipientOptions}
            defaultOptions={categories}
            placeholder="Selecione..."
            styles={customStyles}
          />

          <label htmlFor="start_date">Data de início</label>
          <DatePicker
            id="start_date"
            name="start_date"
            selected={startDate}
            autoComplete="off"
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            locale={pt}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Selecione a data"
          />

          <label htmlFor="end_date">Data de término (opcional)</label>
          <DatePicker
            id="end_date"
            name="end_date"
            selected={endDate}
            autoComplete="off"
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            locale={pt}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Selecione a data"
          />

          <button type="submit">Adicionar tarefa</button>
          <button id="return" type="button" onClick={() => history.push('/')}>
            Voltar
          </button>
        </Form>
      </Content>
    </Container>
  );
}

TodoForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
