export default () => ({
    app: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,
        userRole: {
            user: 1,
            admin: 2
        }
    },
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [`${__dirname}/../**/*.entity.{ts,js}`],
        synchronize: process.env.DATABASE_SYNC
    }
});
