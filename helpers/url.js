import { Platform } from 'react-native';

export const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://127.0.0.1';
export const port = "8080"

export default url = baseUrl + ":" + port