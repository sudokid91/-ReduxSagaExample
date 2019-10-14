import axios from 'axios';
import  {urlSignup, urlLogin, urlGetUserInfo} from '../contants/urlFetchApi';

function* registerFormApi (user) {
    // const response = yield axios({
    //     method: 'post',
    //     headers: {
    //       Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
    //     },
    //     redentials: 'user:passwd',
    //     timeoutInterval : 10000,
    //     sslPingsslPinning: {
    //         cert: '../android/app/src/assets/gopYCertication.cer', // cert file name without the `.cer`
    //         // certs: ['cert-file-name-1', 'cert-file-name-2'], // optionally specify multiple certificates
    //     }, 
    //     url: urlSignup,
    //     data: JSON.stringify({
    //         umUserName : user.umUserName,
    //         umUserPassword: user.password,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email : user.email
    //         // birthday : user.birthday,
    //         // address : user.address 
    //     })
    //   });
    let userObj = JSON.stringify({
      umUserName : user.umUserName,
      umUserPassword: user.umUserPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      email : user.email,
      birthday: user.birthday,
      address: user.address
    });
    // const response = yield axios.post(urlSignup, userObj, {
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8',
    //       "Access-Control-Allow-Origin": "*",
    //     }
    // }).then ();
    // console.log(`response signup: ${JSON.stringify(response)}`);
    // const data = yield response.status === 200 ? JSON.stringify(response.data): [];
    // return data;
    let config = { 
      headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            }
    }
    const response = yield axios.post(urlSignup,userObj,config).then (res => {
      return res;
    }).catch(error => {
      return error.response;
    });
    return response;
  }

function* loginFormApi (user) {
    const response = yield axios({
        method: 'post',
        url: urlLogin,
        data: {
          umUserName : user.umUserName,
          umUserPassword : user.umUserPassword
        }
      });

    return yield response.status === 200 ? JSON.stringify(response): [];
} 

function* fetchUserInfoFormApi (userName, token) { 
  let config = {
    headers: {
      'Authorization': "Bearer " +token,
      method : 'get'
    }
  };

  let url = urlGetUserInfo + `?userName=${userName}`;
  const response = yield axios.get(url,config).then (res => {
    return res;
  }).catch(err => console.log(`error: Loi fetch user info : ${JSON.stringify(err.response)}`));
  // const response = fetch (url,config).then (res => console.log(`res fetch user : ${JSON.stringify(res)}`)).catch(err => console.log(`erros fetch user : ${JSON.stringify(err)}`));
  return yield ((typeof(response) !== 'undefined' && response.status === 200) ? response.data: 0);
}

export const ApiLogin = {
    registerFormApi,
    loginFormApi,
    fetchUserInfoFormApi
}; 

