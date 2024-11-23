import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';

import type { User } from '@/app/providers/auth/AuthWrapper';
import { useAuth } from '@/app/providers/auth/hooks';
import { RoutePath } from '@/app/providers/router/config';
import { fetchUserSignIn } from '@/shared/api';
import { catchError } from '@/shared/lib/catchError';

import classes from './Auth.module.css';

const Auth = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S[^\s@]*@\S+$/.test(value) ? null : 'Некорректная почта'),
      password: (value) => (value.length < 2 ? 'Пароль должен быть не менее 2 символов' : null)
    }
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const [error, user] = await catchError<User>(fetchUserSignIn(values));
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setError('');
      login(user);
      navigate(`${RoutePath.home}`);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta='center' className={classes.title}>
        Вход
      </Title>

      <Paper component='form' onSubmit={form.onSubmit(handleSubmit)} withBorder shadow='md' p={30} mt={30} radius='md'>
        <TextInput
          key={form.key('email')}
          {...form.getInputProps('email')}
          label='Email'
          placeholder='user@mail.ru'
          required
        />
        <PasswordInput
          key={form.key('password')}
          {...form.getInputProps('password')}
          label='Пароль'
          placeholder='Ваш пароль'
          required
          mt='md'
        />

        {!error && <Space h='xl' />}
        {error && <Text mt={8} c='red'>Что-то пошло не так, попробуйте еще раз</Text>}

        <Button loading={loading} type='submit' fullWidth mt='md'>
          Войти
        </Button>
      </Paper>

    </Container>
  );
};

export default Auth;
