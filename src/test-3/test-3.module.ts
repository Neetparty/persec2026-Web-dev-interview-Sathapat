import { Module } from '@nestjs/common';
import { Test3Controller } from './test-3.controller.js'
import { Test3Service } from './test-3.service.js'

@Module({
  imports: [],
  controllers: [Test3Controller],
  providers: [Test3Service],
})
export class Test3Module { }
