import { Module } from '@nestjs/common';
import { Test6Controller } from './test-6.controller.js';
import { Test6Service } from './test-6.service.js';

@Module({
    imports: [],
    controllers: [Test6Controller],
    providers: [Test6Service],
})
export class Test6Module { }
