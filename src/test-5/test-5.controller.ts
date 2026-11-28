import { Body, Controller, Post } from '@nestjs/common';
import { Test5Service } from './test-5.service.js';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class Test5Controller {
    constructor(private readonly test5Service: Test5Service) { }

    @Post('/test-5')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                num: { type: 'number' }
            },
            required: ['num'],
        },
    })
    test5(@Body('num') num: number): { result: number } {
        return this.test5Service.test(num);
    }
}
