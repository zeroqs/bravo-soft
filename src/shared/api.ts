import { API_URL } from '@/shared/constants';

interface Login {
  email: string;
  password: string;
}

export const fetchUserSignIn = async <T>(body: Login): Promise<T> => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password
    })
  });
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  const data: T = await response.json();
  return data;
};
