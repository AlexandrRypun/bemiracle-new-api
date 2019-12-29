import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.congig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(typeOrmConfig)
    ],
})
export class AppModule {
}
