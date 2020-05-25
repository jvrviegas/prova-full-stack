/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Input from '~/components/Input';
import DatePicker from '~/components/DatePicker';

import { Container, Content } from './styles';

export default function ReminderForm({ history }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const todo = history.location.state;
  const formRef = useRef();

  console.tron.log(todo);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('O título é obrigatório'),
        date: Yup.date().required('A data é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post(`/todos/${todo.id}/create/reminder`, data);

      toast.success('Lembrete criado com sucesso');
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

  return (
    <Container>
      <header>
        <strong>Criar lembrete</strong>
      </header>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="title">Título do lembrete</label>
          <Input
            id="title"
            name="title"
            type="title"
            placeholder="Reunião com Marcelo"
          />

          <label htmlFor="date">Data do lembrete</label>
          <DatePicker
            id="date"
            name="date"
            autoComplete="off"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            locale={pt}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            placeholderText="Selecione a data"
          />

          <button type="submit">Adicionar lembrete</button>
          <button id="return" type="button" onClick={() => history.push('/')}>
            Voltar
          </button>
        </Form>
      </Content>
    </Container>
  );
}

ReminderForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape(),
  }).isRequired,
};
