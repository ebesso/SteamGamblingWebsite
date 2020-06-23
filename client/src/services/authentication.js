import axios from 'axios';

const BACKEND_URL = 'http://192.168.133.155:5000'

export const getToken = function getJWTToken(){
    return localStorage.getItem('jwtToken')
}

export const getBalance = function getBalance(){

    axios.get(BACKEND_URL + '/user/get/balance', {headers: {Authorization: 'Bearer ' + getToken()}}).then(res => {

        if(res.status == 200){
            return res.data.balance;
        }else{
            return null;
        }

    });
}

export const getNewAccessToken = function getNewAccessToken(cb){
    axios.get(BACKEND_URL + '/auth/token', {withCredentials: true}).then((res) => {
        localStorage.setItem('jwtToken', res.data.jwtToken);
        return cb(true);

    }, (error) => {
        return cb(false);
    });
}