import { Module } from '@nestjs/common';
import { Test1Module } from './test-1/test-1.module.js';
import { Test2Module } from './test-2/test-2.module.js';
import { Test3Module } from './test-3/test-3.module.js';

@Module({
  imports: [Test1Module, Test2Module, Test3Module],
})
export class AppModule { }
