import { Injectable } from '@nestjs/common';
import { Test3Res } from './test-3.controller.js';

// Commit 1: Research using Google Autocomplete using Trie
// Ref: https://pierrehedkvist.com/posts/autocomplete-using-trie-data-structure

type Trie = {
    isWord: boolean
    children: Map<string, Trie>
}

const createTrie = (): Trie => ({
    isWord: false,
    children: new Map()
})

@Injectable()
export class Test3Service {
    test(input: string, items: string[], maxResult: number): Test3Res {

        const insert = (word: string, trie: Trie) => {
            let node: Trie = trie

            for (const ch of word) {
                const hasNode = node.children.get(ch)
                if (hasNode) {
                    node = hasNode
                } else {
                    const newNode: Trie = {
                        isWord: false,
                        children: new Map<string, Trie>()
                    }
                    node.children.set(ch, newNode)
                    node = newNode
                }
            }

            node.isWord = true
        }

        const search = (word: string, trie: Trie): boolean => {
            let node: Trie = trie

            for (const ch of word) {
                const hasNode = node.children.get(ch)

                if (!hasNode) return false

                node = hasNode
            }

            console.log(node);

            return node.isWord
        }

        const startWith = (prefix: string, trie: Trie): boolean => {
            let node: Trie = trie

            for (const ch of prefix) {
                const hasNode = node.children.get(ch)

                if (!hasNode) return false

                node = hasNode
            }

            return true
        }

        const trie = createTrie()

        for (const item of items) {
            insert(item, trie)
        }

        search(input, trie)

        return {
            result: []
        }
    }
}