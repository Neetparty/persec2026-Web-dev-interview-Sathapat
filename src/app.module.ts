import { Module } from '@nestjs/common';
import { Test1Module } from './test-1/test-1.module.js';
import { Test2Module } from './test-2/test-2.module.js';
import { Test3Module } from './test-3/test-3.module.js';
import { Test4Module } from './test-4/test-4.module.js';
import { Test5Module } from './test-5/test-5.module.js';
import { Test6Module } from './test-6/test-6.module.js';

@Module({
  imports: [Test1Module, Test2Module, Test3Module, Test4Module, Test5Module, Test6Module],
})
export class AppModule { }
