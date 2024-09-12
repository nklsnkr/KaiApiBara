import { create } from 'zustand'
import zukeeper from 'zukeeper';

const useFormState = create(
    zukeeper((set, get) => ({
        apiKey: '',
        setApiKey: (k) => set({ apiKey: k }),
        // updateBears: (newBears) => set({ bears: newBears }),
        formData: {},
        loading: false,
        setFormData: (name, value) => set(state => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        })),
        responseData: {},
        errorData: {},
        makeApiCall: async (formData, apiKey) => {
            set({ loading: true })
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
                    set({ errorData: errorDetails})
                    console.error('Error:', errorDetails.message);
                    throw new Error(errorDetails.message);
                }

                const data = await response.json();
                // console.log('Success:', data);

                set({ responseData: data , loading: false})

                return data;
            } catch (err) {
                console.error('Error:', err.message);
            }

            set({ loading: false })
        }
    })))

window.store = useFormState;

export default useFormState