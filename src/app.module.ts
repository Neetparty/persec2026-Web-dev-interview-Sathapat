import { Module } from '@nestjs/common';
import { Test1Module } from './test-1/test-1.module.js';

@Module({
  imports: [Test1Module],
})
export class AppModule { }
