import httpClient from "./httpClient"

export const fetchAutoComplete = async (location: string) => {
    const apiKey = import.meta.env.VITE_API_KEY
    
    const {data} = await httpClient.get('/v1/search.json', {
        params: {
            key: apiKey,
            q: location
        }
    })

    return data;
}