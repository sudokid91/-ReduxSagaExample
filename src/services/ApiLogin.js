import axios from 'axios';
import { urlSignup, urlLogin, urlGetUserInfo } from '../contants/urlFetchApi';
function* registerFromApi(user) {
  
  let userObj = JSON.stringify({
    umUserName: user.umUserName,
    umUserPassword: user.umUserPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday,
    address: user.address
  });

  let config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  const response = yield axios.post(urlSignup, userObj, config).then(res => {
    return res;
  }).catch(error => {
    return error.response;
  });
  return response;
}

function* loginFromApi(user) {
  const response = yield axios({
      method: 'post',
      headers : {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      url: urlLogin,
      data: JSON.stringify({
        umUserName : user.umUserName,
        umUserPassword : user.umUserPassword
      })
    }) 
    .then(res => {
      return res;
    })
    .catch(error => console.log(`error login`)); 
  return yield response.status === 200 ? JSON.stringify(response): [];
}

function* fetchUserInfoFromApi(userName, token) {
  let config = {
    headers: {
      'Authorization': "Bearer " + token,
      method: 'get'
    }
  };

  let url = urlGetUserInfo + `?userName=${userName}`;
  const response = yield axios.get(url, config).then(res => {
    return res;
  }).catch(err => console.log(`error: Loi fetch user info`));
  return yield ((typeof (response) !== 'undefined' && response.status === 200) ? response.data : 0);
}

export const ApiLogin = {
  registerFromApi,
  loginFromApi,
  fetchUserInfoFromApi
};

