"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@radix-ui/react-label"
import useFormState from "../../utils/state"


export default function List(props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const setFormData = useFormState((state) => state.setFormData)

    const options = props.options.map(o => { return { "value": o, "label": o } })

    return (
        <div className="grid w-full gap-1.5 mb-6 mt-2">
            <Label htmlFor={props.name}>{props.name} : </Label>
            <p className="italic hover:not-italic font-thin text-xs  hover:font-normal">{props.description}</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    id={props.name}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-stone-950"
                    >
                        {value
                            ? options.find((option) => option.value === value)?.label
                            : `select  ${props.name}...`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={`search ${props.name}...`} />
                        <CommandList>
                            <CommandEmpty>No {props.name} found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            if(currentValue !== value){

                                                setValue(currentValue === value ? "" : currentValue)
                                                setFormData(props.name, currentValue)
                                            }
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>

    )
}
