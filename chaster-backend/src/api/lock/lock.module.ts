import { Module } from '@nestjs/common';
import { LockController } from './lock.controller';

@Module({
  controllers: [LockController],
})
export class LockModule {}
