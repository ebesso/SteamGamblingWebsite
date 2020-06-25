import {getToken} from './authentication';

const ENDPOINT = '192.168.133.155:5000/user';

export const balanceUpdates = function(cb){
    let socket = io(ENDPOINT);
}