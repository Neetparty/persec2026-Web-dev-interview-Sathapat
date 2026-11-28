import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Test4Service } from './test-4.service.js';

export type Test4Res = {
    roman: string;
    number: number;
};

type Test4Request = {
    roman: string;
    number: number;
};

@Controller()
export class Test4Controller {
    constructor(private readonly test4Service: Test4Service) { }

    @Post('/test-4')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                roman: { type: 'string' },
                number: { type: 'number' },
            },
            required: ['roman', 'number'],
        },
    })
    test4(@Body() body: Test4Request): Test4Res {
        return {
            roman: this.test4Service.numberToRoman(body.number),
            number: this.test4Service.romanToNumber(body.roman),
        };
    }
}
