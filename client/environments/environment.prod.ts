export const environment = {
    production: true,
    backend: {
        protocol: 'https',
        host: '192.35.34.101/datx/app/storytelling',
        port: undefined,
        endpoints: {
          signup: '/api/auth/signup',
          signin: '/api/auth/signin',
          articles : '/api/articles',
          users : '/api/users',
          slides: '/api/slides',
          slidesFix: '/api/slidesFix',
          images: '/api/images',
          imagesServer : '/api/imagesServer',
          search : '/api/search/slides',
          banner : '/api/banner'

        }
    }
};
