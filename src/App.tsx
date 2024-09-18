
import './App.css';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from 'react';
// @ts-ignore
import ImagePanel from './components/ImagePanel';

// @ts-ignore
import Keys from './components/keys';
// @ts-ignore
import paramGenerator from './components/paramTypes/paramGenerator';
import { Button } from './components/ui/button';
// @ts-ignore
import { oaiDalle3 } from './utils/apiConf';
// @ts-ignore
import useFormState from './utils/state';

// @ts-ignore
import ErrorPanel from './components/ErrorPanel';

export default function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const formData = useFormState((state: { formData: any; }) => state.formData)
  const isLoading = useFormState((state: { isLoading: any }) => state.isLoading)
  const isError = useFormState((state: { isError: any }) => state.isError)
  const errorData = useFormState((state: { errorData: any }) => state.errorData)
  const responseData = useFormState((state: { responseData: any }) => state.responseData)
  const apiKey = useFormState((state: { apiKey: any; }) => state.apiKey)
  const makeApiCall = useFormState((state: { makeApiCall: any; }) => state.makeApiCall)
  const handleResize = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log({ responseData, isLoading, errorData })
  }, [responseData, isLoading, errorData]);

  return (
    <div className="size-full">

      <ResizablePanelGroup direction={width < height ? "vertical" : "horizontal"} className='panel-0 min-h-screen min-w-full p-1 m-1 bg-black flex flex-row '>
        <ResizablePanel className='panel-1 min-w-80 min-h-80 p-4 m-1 bg-black overflow-y-auto flex flex-col flex-grow '>
          <Keys />
          <div className='px-6 overflow-y-auto flex flex-col flex-grow' >
            {oaiDalle3.map((p: any) =>
              paramGenerator(p))
            }
          </div>
          <div className="button-group m-4 flex justify-evenly">
            <Button variant="outline" className='text-cyan-300 bg-black' onClick={() => makeApiCall(formData, apiKey)} >Fetch</Button>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='panel-2 rounded-lg bg-black border-4 border-white min-w-40 min-h-40 p-3 overflow-y-auto flex flex-col flex-grow'>
          {
            (!isError && !!!responseData.data) &&
            <h2>do the thing and the image will appear here</h2>
          }
          {
            (responseData && responseData?.data) &&
            responseData?.data?.map((r: any) =>
              <ImagePanel isLoading={isLoading} data={r} />
            )
          }
          {
            (isError && !!errorData) &&
            <ErrorPanel errorData={errorData.error} />
          }
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  )
}

