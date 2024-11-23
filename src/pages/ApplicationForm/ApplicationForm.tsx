import { useState } from 'react';
import { Button, Center, Container, Paper, Space, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAuth } from '@/app/providers/auth/hooks';
import { fetchApplicationSend } from '@/shared/api';
import { catchError } from '@/shared/lib/catchError';
import { Header } from '@/widgets/Header/Header';

const ApplicationForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      documentName: ''
    },

    validate: {
      documentName: (value) => (value.length < 5 ? 'Документ должен иметь больше 5 букв' : null)
    }
  });
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const [error, _] = await catchError(
      fetchApplicationSend({ documentName: values.documentName, userId: Number(user!.id) })
    );

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setError('');
      setSuccess(true);
    }
  };

  return (
    <Container size={1420}>
      <Header />
      <Center>
        <Paper onSubmit={form.onSubmit(handleSubmit)} component='form' withBorder shadow='md' p={30} mt={30} w={340} radius='md'>
          <TextInput
            key={form.key('documentName')}
            {...form.getInputProps('documentName')}
            label='Наименование документа'
            placeholder='ГОСТ 123'
            required
          />

          {!error && <Space h='sm' />}
          {error && <Text mt={8} c='red'>{error}</Text>}

          {success && <Text mt={8} c='green'>Заявка успешно отправлена</Text>}

          <Button type='submit' loading={loading} fullWidth mt='xl'>
            Отправить
          </Button>
        </Paper>
      </Center>
    </Container>
  );
};

export default ApplicationForm;
