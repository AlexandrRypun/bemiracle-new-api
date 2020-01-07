import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.congig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ],
})
export class AppModule {
}
