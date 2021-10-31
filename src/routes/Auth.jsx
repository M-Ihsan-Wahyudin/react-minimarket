import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    this.usercheckRequest()
    return this.authenticated;
  }

  usercheckRequest() {
    let token = localStorage.getItem('jwt');
    if(token) {
      axios({
        method: 'GET',
        baseURL: 'http://127.0.0.1:8000/api/usercheck',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.info(res)
        this.authenticated = true
      })
      .catch(err => {
        console.info(err.response)
        this.authenticated = false
      })
    } else {
      this.authenticated = false
    }
  }
}

export default new Auth()