import { Body, Controller, Post } from '@nestjs/common'; // Imports decorators for defining the Test-4 HTTP route.
import { Test4Service } from './test-4.service.js'; // Imports the service used to handle the route.
import { ApiBody } from '@nestjs/swagger';

export type Test4Res = {
    roman: string
    number: number
}

@Controller() // Defines a controller with no shared route prefix.
export class Test4Controller { // Declares the controller for Test-4 endpoints.
    constructor(private readonly test4Service: Test4Service) { } // Injects the service that implements Test-4 behavior.

    @Post('/test-3')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                roman: { type: 'string' },
                number: { type: 'number' },
            },
            required: ['roman', 'number',],
        },
    })
    test1(@Body() roman: string, number: number): Test4Res {
        return {
            roman: this.test4Service.numberToRoman(number),
            number: this.test4Service.romanToNumber(roman)
        }
    }
} 
