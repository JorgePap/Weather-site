import httpClient from "./httpClient"

export const fetchAutoComplete = async (location: string) => {
    const {data} = await httpClient.get('/v1/search.json', {
        params: {
            key: 'c3f2c186ec8b42dc8d4105328230411',
            q: location
        }
    })

    return data;
}