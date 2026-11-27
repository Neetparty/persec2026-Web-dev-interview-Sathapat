import { Module } from '@nestjs/common';
import { Test2Controller } from './test-2.controller.js'
import { Test2Service } from './test-2.service.js'

@Module({
  imports: [],
  controllers: [Test2Controller],
  providers: [Test2Service],
})
export class Test2Module { }
