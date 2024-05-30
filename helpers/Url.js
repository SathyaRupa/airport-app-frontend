import {Platform} from 'react-native';

export const protocol = 'http';
export const ip = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
export const port = '8080';

const url = protocol + '://' + ip + ':' + port;
export default url;
