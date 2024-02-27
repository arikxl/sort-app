'use client'

import { useSortingAlgorithmContext } from "@/context/Visualizer";


export default function Home() {

  const { arrayToSort, isSorting } = useSortingAlgorithmContext()
  // console.log( arrayToSort, isSorting)

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="flex h-full justify-center">
        <div id='contentContainer' className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4">
          <div className='h-[66px] relative flex items-center justify-between w-full'>
            <h1 className='text-gray-300 text-2xl hidden font-light md:flex'>Sorting Visualizer</h1>
            <div>
              Controls
            </div>
          </div>
          <div className='relative h-[calc(100vh-66px)] w-full'>
            <div className='absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end'>
              {arrayToSort.map((value, index) => (
                <div key={index} style={{ height: `${value}px` }}
                  className='array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color'>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
