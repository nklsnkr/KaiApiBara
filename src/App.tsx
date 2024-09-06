
import './App.css'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Keys from './components/keys';
import paramGenerator from './components/paramTypes/paramGenerator';

export default function App() {

  return (
    <div className="size-full">

      <ResizablePanelGroup direction="horizontal" className='panel-0 min-h-screen min-w-full p-1 m-1 bg-black'>
        <ResizablePanel className='panel-1 min-w-fit p-4 m-1 bg-black'>
          <Keys />
          <div className='px-6' >
          {oaiDalle3.map(p =>
            paramGenerator(p))
          }
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className='panel-2 rounded-lg bg-black border-4 border-white min-w-96 p-3'>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}



const oaiDalle3 =
  [
    {
      "name": "prompt",
      "type": "text",
      "required": true,
      "description": "A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3."
    },
    {
      "name": "model",
      "type": "list",
      "required": false,
      "description": "Defaults to dall-e-2 The model to use for image generation.",
      options: ['dall-e-2', 'dall-e-3']
    },
    {
      "name": "n",
      "type": "integer",
      "required": false,
      "description": "Defaults to 1 The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.",
    },
    {
      "name": "quality",
      "type": "list",
      "required": false,
      "description": "Defaults to standard The quality of the image that will be generated. hd creates images with finer details and greater consistency across the image. This param is only supported for dall-e-3.",
      'options': ['standard', 'hd']
    },
    {
      "name": "response_format",
      "type": "list",
      "required": false,
      "description": "Defaults to url The format in which the generated images are returned. Must be one of url or b64_json. URLs are only valid for 60 minutes after the image has been generated.",
      'options': ['b64_json', 'url']
    },
    {
      "name": "size",
      "type": "list",
      "required": false,
      "description": "Defaults to 1024x1024 The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2. Must be one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3 models.",
      'options': ['1024x1024', '1792x1024', '1024x1792', '256x256', '512x512', '1024x1024']
    },
    {
      "name": "style",
      "type": "list",
      "required": false,
      "description": "Defaults to vivid. The style of the generated images. Must be one of vivid or natural. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. This param is only supported for dall-e-3.",
      'options': ['vivid', 'natural']
    },
    {
      "name": "user",
      "type": "string",
      "required": false,
      "description": "A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse."
    }
  ]
