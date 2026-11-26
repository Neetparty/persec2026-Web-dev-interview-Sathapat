import { Module } from '@nestjs/common';
import { Test1Controller } from './test-1.controller.js'
import { Test1Service } from './test-1.service.js'

@Module({
  imports: [],
  controllers: [Test1Controller],
  providers: [Test1Service],
})
export class Test1Module { }
