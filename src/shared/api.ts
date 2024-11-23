import { API_URL } from '@/shared/constants';

interface Login {
  email: string;
  password: string;
}

export interface Applications {
  id: number;
  documentName: string;
  userIds: number[];
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

export const fetchUserApplications = async <T>(userId: number): Promise<T> => {
  const response = await fetch(`${API_URL}/user/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });

  const data: T = await response.json();
  return data;
};
