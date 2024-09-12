import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useFormState from "../../utils/state"

export function Textparam(props) {

    const setFormData = useFormState((state) => state.setFormData)

    const handleOnchange = (e) => {
        setFormData(props.name, e.target.value)
    }

    return (
        <div className="grid w-full gap-1.5 mb-6 mt-2">
            <Label id={`lb-${props.name}`} htmlFor={props.name}>{props.name} : </Label>
            <p className="italic hover:not-italic font-thin text-xs  hover:font-normal">{props.description}</p>
            <Textarea id={props.name} className='bg-stone-950' placeholder={props.name} rows={3} onChange={handleOnchange} {...props} />
        </div>
    )
}
