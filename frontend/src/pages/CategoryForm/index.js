/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Input from '~/components/Input';

import { Container, Content } from './styles';

export default function CategoryForm({ history }) {
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('categories', data);

      toast.success('Categoria criada com sucesso!');
      history.push('/categories');
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
        <strong>Criar categoria</strong>
      </header>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <Input id="name" name="name" type="name" placeholder="Trabalho" />

          <button type="submit">Adicionar categoria</button>
          <button
            id="return"
            type="button"
            onClick={() => history.push('/categories')}
          >
            Voltar
          </button>
        </Form>
      </Content>
    </Container>
  );
}

CategoryForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
