import { Module } from '@nestjs/common';
import { Test5Controller } from './test-5.controller.js';
import { Test5Service } from './test-5.service.js';

@Module({
    imports: [],
    controllers: [Test5Controller],
    providers: [Test5Service],
})
export class Test5Module { }
