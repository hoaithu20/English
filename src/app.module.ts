import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { QuestionsModule } from './modules/questions.module';
import { AdminModule } from './modules/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env', '.env.production'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('databaseConfig'),
      inject: [ConfigService],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('httpConfig'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    QuestionsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
