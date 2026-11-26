import { Injectable } from '@nestjs/common';
import { Test1Res } from './test-1.controller.js';

const brackets = {
    round: ["(", ")"],
    square: ["[", "]"],
    curly: ["{", "}"],
    angle: ["<", ">"]
}

const mapper = (val1: string, val2: string): boolean => {

    let result = false

    Object.keys(brackets).forEach(key => {
        const bracket = brackets[key as keyof typeof brackets]
        if (bracket[0] === val1 && bracket[1] === val2) {
            result = true
        }
    })
    return result
}

@Injectable()
export class Test1Service {
    test(input: string): Test1Res {
        const newArr = input.split("")
        if (newArr.length % 2 === 1) {
            return {
                input,
                result: false
            }
        }

        const start = newArr.slice(0, newArr.length / 2)
        const end = newArr.slice(newArr.length / 2, newArr.length).toReversed()

        let result: boolean = false

        start.some((v, i) => {
            const r = mapper(v, end[i])
            if (!r) {
                result = false
                return true
            }

            result = true
            return false
        })

        return {
            input,
            result
        }
    }
}