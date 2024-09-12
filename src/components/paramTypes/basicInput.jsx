import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import useFormState from "../../utils/state"

export function BasicInput(props) {
    const setFormData = useFormState((state) => state.setFormData)

    const handleOnchange = (e) => {
        setFormData(props.name, e.target.value)
    }

    return (
        <div className="grid w-full items-center gap-1.5 mb-6 mt-2">
            <Label htmlFor={props.name}>{props.name} : </Label>
            <p className="italic hover:not-italic font-thin text-xs  hover:font-normal">{props.description}</p>
            <Input id={props.name} className='bg-stone-950' placeholder={props.name} {...props} onChange={handleOnchange} />
        </div>)
}
