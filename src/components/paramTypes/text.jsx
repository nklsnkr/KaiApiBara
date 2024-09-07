import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Textparam(props) {
    return (
        <div className="grid w-full gap-1.5 mb-6 mt-2">
            <Label id={`lb-${props.name}`} htmlFor={`p-${props.name}`}>{props.name} : </Label>
            <p className="italic hover:not-italic font-thin text-xs  hover:font-normal">{props.description}</p>
            <Textarea id={`p-${props.name}`} className='bg-stone-950' placeholder={props.name} rows={3} {...props} />
        </div>
    )
}
