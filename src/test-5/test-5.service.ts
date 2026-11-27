import { Injectable } from '@nestjs/common';

@Injectable()
export class Test5Service {
    test(num: number): { result: number } {
        return {
            result: Number(num.toString().split("").map(Number).toSorted((a, b) => b - a).join(""))
        }
    }
}
