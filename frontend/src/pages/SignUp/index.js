/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Input';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email().required('O email é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const { name, email, password } = data;

      // Validation passed
      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <img src={logo} alt="TodoList" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Seu nome</label>
        <Input id="name" name="name" placeholder="John Doe" />

        <label htmlFor="email">Seu email</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
        />

        <label htmlFor="password">Sua senha</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="*************"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
