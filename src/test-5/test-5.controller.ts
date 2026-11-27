import { Controller, Get } from '@nestjs/common';
import { Test5Service } from './test-5.service.js';

@Controller()
export class Test5Controller {
    constructor(private readonly test5Service: Test5Service) { }

    @Get('/test-5')
    test5(): { message: string } {
        return this.test5Service.test();
    }
}
