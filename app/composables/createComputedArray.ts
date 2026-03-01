import type { ComputedRef } from "vue";

export default function(blockSize: number, fun: (i: number) => number): ComputedRef<Array<number>> {
    return computed(() => {
        let vec = new Array(blockSize).fill(0);
        for (let i = 0; i < blockSize; i++) {
            vec[i] = fun(i);
        }
        return vec;
    });
}