import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export function BasicInput(props) {
console.log(props)
    const handleOnchange = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="grid w-full items-center gap-1.5 mb-6 mt-2">
            <Label htmlFor={`p-${props.name}`}>{props.name} : </Label>
            <p className="italic hover:not-italic font-thin text-xs  hover:font-normal">{props.description}</p>
            <Input id={`p-${props.name}`} className='bg-stone-950' placeholder={props.name} {...props} onChange={handleOnchange} />
        </div>)
}
