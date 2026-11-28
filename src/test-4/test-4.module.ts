import { Module } from '@nestjs/common';
import { Test4Controller } from './test-4.controller.js';
import { Test4Service } from './test-4.service.js';

@Module({
    imports: [],
    controllers: [Test4Controller],
    providers: [Test4Service],
})
export class Test4Module { }
