export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '127.0.0.1',
        port: '3000',
        endpoints: {
          signup: '/api/auth/signup',
          signin: '/api/auth/signin',
          articles :'/api/articles',
          users : '/api/users'
        }
    }
};
