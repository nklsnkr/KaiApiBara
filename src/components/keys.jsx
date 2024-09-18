import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import useFormState from "../utils/state"


export default function Keys() {

    const apiKey = useFormState((state) => state.apiKey)

    const setApiKey = useFormState((state) => state.setApiKey)
    const saveKeyToLocal = useFormState((state) => state.saveKeyToLocal)

    const saveKey = (e) => setApiKey(e.target.value)

    return (
        <Accordion type="single" collapsible className="w-full min-h-fit mb-8 p-2">
            <AccordionItem className='hover:border-0 active:border-0' value="item-1">
                <AccordionTrigger className="text-white hover:border-0 active:border-0">api key</AccordionTrigger>
                <AccordionContent className='min-h-16 p-4  rounded border-2' >
                    <Input placeholder="openai api key" className='bg-cyan-950' onChange={saveKey} value={apiKey} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className='hover:text-white hover:bg-black mt-3' variant="ghost" onClick={ saveKeyToLocal } >Save</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Save to local storage
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </AccordionContent>

            </AccordionItem >
        </Accordion>
    )
}
