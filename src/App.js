import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const formData = useFormState((state) => state.formData);
    const isLoading = useFormState((state) => state.isLoading);
    const isError = useFormState((state) => state.isError);
    const errorData = useFormState((state) => state.errorData);
    const responseData = useFormState((state) => state.responseData);
    const apiKey = useFormState((state) => state.apiKey);
    const makeApiCall = useFormState((state) => state.makeApiCall);
    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        console.log({ responseData, isLoading, errorData });
    }, [responseData, isLoading, errorData]);
    return (_jsx("div", { className: "size-full", children: _jsxs(ResizablePanelGroup, { direction: width < height ? "vertical" : "horizontal", className: 'panel-0 min-h-screen min-w-full p-1 m-1 bg-black flex flex-row ', children: [_jsxs(ResizablePanel, { className: 'panel-1 min-w-80 min-h-80 p-4 m-1 bg-black overflow-y-auto flex flex-col flex-grow ', children: [_jsx(Keys, {}), _jsx("div", { className: 'px-6 overflow-y-auto flex flex-col flex-grow', children: oaiDalle3.map((p) => paramGenerator(p)) }), _jsx("div", { className: "button-group m-4 flex justify-evenly", children: _jsx(Button, { variant: "outline", className: 'text-cyan-300 bg-black', onClick: () => makeApiCall(formData, apiKey), children: "Fetch" }) })] }), _jsx(ResizableHandle, { withHandle: true }), _jsxs(ResizablePanel, { className: 'panel-2 rounded-lg bg-black border-4 border-white min-w-40 min-h-40 p-3 overflow-y-auto flex flex-col flex-grow', children: [(!isError && !!!responseData.data) &&
                            _jsx("h2", { children: "do the thing and the image will appear here" }), (responseData && responseData?.data) &&
                            responseData?.data?.map((r) => _jsx(ImagePanel, { isLoading: isLoading, data: r })), (isError && !!errorData) &&
                            _jsx(ErrorPanel, { errorData: errorData.error })] })] }) }));
}
