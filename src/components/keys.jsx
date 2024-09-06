import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'


export default function Keys() {

    const saveKey = () => {
        console.log('save')
    }
    return (
        <Accordion type="single" collapsible  className="w-full min-h-fit mb-8 p-2">
            <AccordionItem className='hover:border-0 active:border-0' value="item-1">
                <AccordionTrigger className="text-white hover:border-0 active:border-0">API KEY</AccordionTrigger>
                <AccordionContent className='min-h-16 p-4  rounded border-2' >
                    <Input placeholder="OPEN AI API KEY" className='bg-cyan-950' />
                    <Button className='mt-4 hover:bg-cyan-900' onClick={saveKey} >
                        Save</Button>
                </AccordionContent>
            </AccordionItem >
        </Accordion>
    )
}
