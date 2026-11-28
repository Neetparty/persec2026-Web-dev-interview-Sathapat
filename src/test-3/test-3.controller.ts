import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test3Service } from './test-3.service.js';

export type Test3Res = {
    result: string[];
};

type Test3Request = {
    search: string;
    items: string[];
    maxResult: number;
};

@Controller()
export class Test3Controller {
    constructor(private readonly test3Service: Test3Service) { }

    @Post('/test-3')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                search: { type: 'string' },
                items: { type: 'array', items: { type: 'string' } },
                maxResult: { type: 'number' },
            },
            required: ['search', 'items', 'maxResult'],
        },
    })
    test3(@Body() body: Test3Request): Test3Res {
        return this.test3Service.test(body.search, body.items, body.maxResult);
    }
}
