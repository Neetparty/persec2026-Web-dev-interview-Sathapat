import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test1Service } from './test-1.service.js';

export type Test1Res = {
    input: string
    result: boolean
}

@Controller()
export class Test1Controller {
    constructor(private readonly test1Service: Test1Service) { }

    @Post('/test-1')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { input: { type: 'string' } },
            required: ['input'],
        },
    })
    test1(@Body('input') input: string): Test1Res {
        return this.test1Service.test(input);
    }
}
