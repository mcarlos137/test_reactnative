import axios from "axios";
import Config from "react-native-config";

let apiURL: string = ''
if (!Config.USE_MOCK_API && Config.API_URL) {
    apiURL = Config.API_URL
}

const client = axios.create({ baseURL: apiURL })

export const request = ({ ...options }) => {
    const onSuccess = (response: any) => response
    const onError = (error: any) => {
        throw error
    }
    return client({ ...options }).then(onSuccess).catch(onError)
}
