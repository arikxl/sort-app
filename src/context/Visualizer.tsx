'use client'

import { AnimationArrayType, SortingAlgorithmType } from "@/lib/types";
import { generateRandomNumberFromInterval, MAX_ANIMATION_SPEED } from "@/lib/utils";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface SortingAlgorithmContextType {
    arrayToSort: number[];
    setArrayToSort: (array: number[]) => void;
    selectedAlgorithm: SortingAlgorithmType;
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
    isSorting: boolean;
    setIsSorting: (isSorting: boolean) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    isAnimationComplete: boolean;
    setAnimationComplete: (isAnimationComplete: boolean) => void;
    resetArrayAndAnimation: () => void;
    runAnimation: (animations: AnimationArrayType) => void;

    requiresReset: boolean;
}


const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);

    const requiresReset = isAnimationComplete || isSorting;


    useEffect(() => {
        resetArrayAndAnimation();
        window.addEventListener('resize', resetArrayAndAnimation);

        return () => {
            window.addEventListener('resize', resetArrayAndAnimation);
        }
    }, [])

    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById('contentContainer');
        if (!contentContainer) return;

        const contentContainerWidth = contentContainer.clientWidth;
        const tempArray: number[] = [];
        const numOfLines = contentContainerWidth / 8;
        const contentContainerHeight = window.innerHeight;
        const maxLineHeight = Math.max(contentContainerHeight - 170, 100);

        for (let i = 0; i < numOfLines; i++) {
            tempArray.push(
                generateRandomNumberFromInterval(35, maxLineHeight)
            )
        }

        setArrayToSort(tempArray);
        setAnimationComplete(false);
        setIsSorting(false);

    }

    const runAnimation = (animations: AnimationArrayType) => {
        setIsSorting(true);
        const inverseSpeed = (1 / animationSpeed) * 200;
        const arrayLines = document.getElementsByClassName('array-line') as HTMLCollectionOf<HTMLElement>;

        const updateClassList = (indexes: number[], addClassName: string, removeClassName: string) => {
            indexes.forEach((i) => {
                arrayLines[i].classList.add(addClassName);
                arrayLines[i].classList.remove(removeClassName);
            })
        }

        const updateHeightValues = (lineIndex: number, newHeight: number | undefined) => {
            if (newHeight === undefined) return;
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        }

        animations.forEach((animation, idx) => {
            setTimeout(() => {
                const [values, isSwap] = animation;

                if (!isSwap) {
                    updateClassList(values, 'changed-line-color', 'default-line-color')
                    setTimeout(() => {

                        updateClassList(values, 'default-line-color', 'changed-line-color')
                    }, inverseSpeed);
                } else {
                    const [lineIndex, newHeight] = values;
                    updateHeightValues(lineIndex, newHeight);
                }

            }, idx * inverseSpeed);
        })

    }

    const value = {
        arrayToSort, setArrayToSort, selectedAlgorithm, setSelectedAlgorithm,
        isSorting, setIsSorting, isAnimationComplete, setAnimationComplete, requiresReset,
        animationSpeed, setAnimationSpeed, resetArrayAndAnimation, runAnimation
    }

    return <SortingAlgorithmContext.Provider value={value}>
        {children}
    </SortingAlgorithmContext.Provider>
}


export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext);
    if (!context) {
        throw new Error('SortingAlgorithmContext is not available')
    }
    return context
}