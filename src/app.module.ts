import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarsModule } from './bars/bars/bars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que la configuración esté disponible globalmente
      envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env',
    }),
   MongooseModule.forRoot(process.env.MONGO_URI!)
,
    BarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
