'use client'

import { SortingAlgorithmType } from "@/lib/types";
import { MAX_ANIMATION_SPEED } from "@/lib/utils";
import React, { createContext, ReactNode, useContext, useState } from "react";


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
    runAnimation: () => void;

    // requiresReset: boolean;
}


const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);


    const resetArrayAndAnimation = () => {

    }

    const runAnimation = () => {

    }

    const value = {
        arrayToSort, setArrayToSort, selectedAlgorithm, setSelectedAlgorithm,
        isSorting, setIsSorting, isAnimationComplete, setAnimationComplete,
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