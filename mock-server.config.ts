import type { MockServerConfig } from 'mock-config-server';

const users = [
  { id: 1, email: 'ivanov@mail.ru', name: 'Иванов Иван Игоревич', password: '123' },
  { id: 2, email: 'petrov@mail.ru', name: 'Петров Пётр Павлович', password: '1234' },
  { id: 3, email: 'sidorov@mail.ru', name: 'Сидоров Сергей Семёнович', password: '12345' }
];
const applications = [
  { id: 1, documentName: 'ГОСТ 123', userIds: [1, 2] },
  { id: 2, documentName: 'ГОСТ Р 125', userIds: [2, 3] },
  { id: 3, documentName: 'ГОСТ РВ 0009', userIds: [1, 3] },
  { id: 4, documentName: 'ГОСТ 456', userIds: [1] },
  { id: 5, documentName: 'ГОСТ Р 789', userIds: [2] },
  { id: 6, documentName: 'ГОСТ 1010', userIds: [3] },
  { id: 7, documentName: 'ГОСТ Р 2020', userIds: [1, 2, 3] },
  { id: 8, documentName: 'ГОСТ 333', userIds: [2, 3] },
  { id: 9, documentName: 'ГОСТ Р 999', userIds: [1, 3] }
];

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/auth/sign-in',
        method: 'post',
        routes: [
          {
            data: { message: 'success' },
            interceptors: {
              response: (_, { request, setStatusCode, appendHeader }) => {
                const body = request.body;

                const user = users.find((user) => user.email === body.email);

                if (!user) {
                  setStatusCode(401);
                  return { message: 'Unauthorized' };
                }

                const { password, ...userWithoutPassword } = user;

                if (password !== body.password) {
                  setStatusCode(401);
                  return { message: 'Unauthorized' };
                }
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');

                return userWithoutPassword;
              }
            }
          }
        ]
      },
      {
        path: '/auth/session',
        method: 'get',
        routes: [
          {
            data: { message: 'success' },
            interceptors: {
              response: (data, { request, setStatusCode }) => {
                if (request.headers.cookie === 'token=auth-user-token') return data;

                setStatusCode(401);
                return { error: 'unauthorized' };
              }
            }
          }
        ]
      },
      {
        path: '/users',
        method: 'get',
        routes: [
          {
            data: () => users
          }
        ]
      },
      {
        path: '/users/:id',
        method: 'get',
        routes: [
          {
            data: (request) => users.find((user) => user.id === Number(request.params.id))
          }
        ]
      },
      {
        path: '/applications',
        method: 'get',
        routes: [
          {
            data: () => applications
          }
        ]
      },
      {
        path: '/applications',
        method: 'post',
        routes: [
          {
            data: { message: 'success' },
            interceptors: {
              response: (data, { request, setStatusCode }) => {
                const { userId, name } = request.body;

                const apllication = applications.find(
                  (app) => app.documentName === name
                );
                const existingApplication = apllication && apllication.userIds.includes(userId);

                if (existingApplication) {
                  setStatusCode(400);
                  return { message: 'Вы уже отправляли заявку на этот документ, она уже была учтена.' };
                }

                if (!apllication) {
                  applications.push({
                    id: applications.length + 1,
                    documentName: name,
                    userIds: [userId]
                  });
                } else {
                  apllication.userIds.push(userId);
                }

                return data;
              }
            }
          }
        ]
      }
    ]
  },
  cors: {
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'Set-Cookie'],
    credentials: true
  }
};

export default mockServerConfig;
