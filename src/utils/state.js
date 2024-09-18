import { create } from 'zustand'
import zukeeper from 'zukeeper';
import { localStorageRoot } from './apiConf';

const useFormState = create(
    zukeeper((set, get) => ({
        apiKey: JSON.parse(localStorage.getItem(localStorageRoot + '.apiKey')) || '',
        setApiKey: (k) => set({ apiKey: k }),
        formData: {},
        isLoading: false,
        setFormData: (name, value) => set(state => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        })),
        prevResponses: [],
        resetState: () => set({ isLoading: false, isError: false, prevResponses: [...prevResponses, get().responseData], responseData: {} }),
        responseData: {},
        errorData: {},
        isError: false,
        saveKeyToLocal: (e) => {
            console.log('saveKeyToLocal', get().apiKey, e);
            localStorage.setItem(localStorageRoot + '.apiKey', JSON.stringify(get().apiKey));
        },
        makeApiCall: async (formData, apiKey) => {
            set({ isLoading: true })
            try {

                const response = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    body: JSON.stringify({ ...formData, n: Number(formData.n || 1) }),
                    headers: new Headers({
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    }),
                });

                if (!response.ok) {
                    const errorDetails = await response.json();
                    set({ errorData: errorDetails });
                    set({ isError: true });
                    console.error('Error:', errorDetails.message);
                    throw new Error(errorDetails.message);
                }

                const data = await response.json();
                // console.log('Success:', data);

                set({ responseData: data, isLoading: false })

                return data;
            } catch (err) {
                console.error('Error:', err.message);
            }

            set({ isLoading: false })
        }
    })))

window.store = useFormState;

export default useFormState