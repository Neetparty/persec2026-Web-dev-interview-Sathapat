import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test6Service } from './test-6.service.js';

@Controller()
export class Test6Controller {
    constructor(private readonly test6Service: Test6Service) { }

    @Post('/test-6')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                items: { type: 'array', items: { type: 'number' } },
                range: { type: 'number' },
            },
            required: ['items', 'range'],
        },
    })
    test6(@Body() body: { items: number[]; range: number }): { result: number[] } {
        return this.test6Service.Tribonacci(body.items, body.range);
    }
}
