import { resolve, join } from 'path';

export default () => ({
    app: {
        domain: process.env.DOMAIN,
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '30m',
        jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '1d',
        userRole: {
            user: 1,
            admin: 2
        },
        files: {
            path: {
                productImages: resolve('files', 'products'),
                defaultProductImage: join('default', 'default.jpg')
            },
            allowedExtensions: {
                image: ['jpg', 'jpeg', 'png']
            },
            imageSize: {
                product: {
                    origin: {
                        height: 1110,
                        width: 870
                    },
                    teaser: {
                        height: 766,
                        width: 600
                    },
                    thumbnail: {
                        height: 128,
                        width: 100
                    }
                }
            }
        }
    },
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [resolve(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: process.env.DATABASE_SYNC
    }
});
