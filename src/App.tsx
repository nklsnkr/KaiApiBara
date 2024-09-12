
import './App.css';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Keys from './components/keys';
import paramGenerator from './components/paramTypes/paramGenerator';
import { useEffect, useState } from 'react';
import { oaiDalle3 } from './utils/apiConf';
import { Button } from './components/ui/button';
import useFormState from './utils/state';
import ImagePanel from './components/ImagePanel';

// import { sampleProps } from './utils/apiConf.js'

export default function App() {
  
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const formData = useFormState((state: { formData: any; }) => state.formData)
  const loading = useFormState((state: { loading: any }) => state.loading)
  const responseData = // sampleProps
    useFormState((state: { responseData: any }) => state.responseData)
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
    console.log({ responseData, loading, 'here': 'here' })
  }, [responseData, loading]);

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
            <Button variant="ghost">Save</Button>
            <Button variant="outline" className='text-cyan-300 bg-black' onClick={() => makeApiCall(formData, apiKey)} >Fetch</Button>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='panel-2 rounded-lg bg-black border-4 border-white min-w-40 min-h-40 p-3 overflow-y-auto flex flex-col flex-grow'>
          {
            !!!responseData.data &&
            <h2>do the thing and the image will appear here</h2>
          }
          {responseData && responseData?.data 
          &&  responseData?.data?.map((r: any) =>
              <ImagePanel loading={loading} data={r} />
            )
          }
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  )
}

