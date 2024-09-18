import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'

const ImagePanel = ({ isLoading, data }) => {

    console.log(data)

    if (isLoading)
        return <SkeletonImage />

    return (
        <div className='overflow-y-auto flex flex-col flex-grow min-h-fit m-2 p-2'>
            {data?.revised_prompt &&
                <div className="text-white">
                    <h3>revised_prompt : </h3> <p>{data.revised_prompt}</p>
                </div>
            }
            {
                data.b64_json !== null && data.b64_json !== undefined
                ?
                <img
                    alt="image for prompt you entered in b64"
                    className="aspect-square w-full rounded-md object-cover"
                    height="400"
                    src={`data:image/jpeg;base64,${data.b64_json}`}
                    width="400"
                />
                :
                <img
                    alt="image for prompt you entered in url"
                    className="aspect-square w-full rounded-md object-cover"
                    height="400"
                    src={data.url}
                    width="400"
                />
            }
        </div>
    )
}

export default ImagePanel

const SkeletonImage = () => {
    return (
        <div className='overflow-y-auto flex flex-col flex-grow self-center w-full p-2'>
            <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="mt-4 h-[400px] w-[400px] rounded-xl" />
        </div>
    )
}