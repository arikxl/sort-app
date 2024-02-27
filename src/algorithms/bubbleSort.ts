import { AnimationArrayType } from "@/lib/types";

export function generateBubbleSortAnimationArray(
    isSorting: boolean, array: number[],
    runAnimation: (animations: AnimationArrayType) => void
) {
    if (isSorting) return;
    if (array.length <= 1) return [];


}