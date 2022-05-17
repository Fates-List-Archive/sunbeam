import { writable } from 'svelte/store';

interface DocTreeInterface {
    treeDepthOne: string[],
    treeDepthTwo: any,
}

type DocTree = DocTreeInterface;

export let doctreeCache = writable<DocTree>(null);