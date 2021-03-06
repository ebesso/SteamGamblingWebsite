import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000'

export const getToken = function getJWTToken(){
    return localStorage.getItem('jwtToken')
}

export const getInventory = function getInventory(cb){
    axios.get(BACKEND_URL + '/steam/inventory', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then(res => {
        cb(true, res.data)
    }, (error) => {cb(false, null)});
}

export const getSteamProfile = function getSteamProfile(cb){
    axios.get(BACKEND_URL + '/user/get/steam', {headers: {Authorization: 'Bearer ' + getToken()}}).then(res => {
        cb(res.data);
    }, (error) => {
        console.log(error.message);
        cb(null)
    });
}

export const getBalance = function getBalance(cb){

    axios.get(BACKEND_URL + '/user/get/balance', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then(res => {

        if(res.status == 200){
            return cb(res.data.balance);
        }else{
            return cb(null);
        }

    });
}

export const getBets = function getBets(cb){
    axios.get(BACKEND_URL + '/user/get/bets', {withCredentials: true, headers: {Authorization: 'Bearer ' + getToken()}}).then(res => {
        cb(res.data);
    });
}

export const getNewAccessToken = function getNewAccessToken(cb){
    axios.get(BACKEND_URL + '/auth/token', {withCredentials: true}).then((res) => {
        console.log('Refreshed access token');
        localStorage.setItem('jwtToken', res.data.jwtToken);
        return cb(true);

    }, (error) => {
        console.log('Failed to refresh access token');
        localStorage.removeItem('jwtToken');
        return cb(false);
    });
}