import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test2Service } from './test-2.service.js';

export type Test2Res = {
    input: string[]
    result: string[]
}

@Controller()
export class Test2Controller {
    constructor(private readonly test2Service: Test2Service) { }

    @Post('/test-2')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { input: { type: 'string[]' } },
            required: ['input'],
        },
    })
    test1(@Body('input') input: string[]): Test2Res {
        return this.test2Service.test(input);
    }
}
