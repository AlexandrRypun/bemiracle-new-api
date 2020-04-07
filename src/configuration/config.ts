import { resolve, join } from 'path';

export default () => ({
    app: {
        domain: process.env.DOMAIN,
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        userRole: {
            user: 1,
            admin: 2
        },
        files: {
            path: {
                productImages: resolve('files', 'products'),
                defaultProductImage: join('default', 'default.png')
            },
            allowedExtensions: {
                image: ['jpg', 'jpeg', 'png']
            },
            imageSize: {
                product: {
                    origin: {
                        height: 900,
                        width: 900
                    },
                    teaser: {
                        height: 300,
                        width: 300
                    },
                    thumbnail: {
                        height: 100,
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
