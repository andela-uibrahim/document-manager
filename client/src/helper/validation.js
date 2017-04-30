/*eslint-disable no-undef*/
/**
 * class to validate form inputs
 */
class Validation {
/**
 * class method to validate email address
 * @param{string} email
 * @return{boolean} return true or false
 */
  validEmail(email) {
   const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);

  }
/**
 * class method to validate password
 * @param{string} password
 * @return{bolean} boolean
 */
  isValidPassword(password) {
    if (password.length > 8) {
        return true;
    }
    toastr.error('please enter a minumum of 8 characters', 'Error!');
    return false
  }

/**
 * class method to validate empty input
 * @param{string} input
 * @return{boolean} boolean
 */
  isEmpty(input) {
    if (input) {
      return false;
    }
    return true
  }

/**
 * class method to validate userData
 * @param{object} userData
 * @return{boolean} boolean
 */
  isValidUserData(userData){
  if(!this.validEmail(userData.email)){
    toastr.error('invalid email type', 'Error!')
    return false
  }
  if(this.isEmpty(userData.username)){
    toastr.error('Please enter a username', 'Error!')
    return false
  }
  if(this.isEmpty(userData.firstname)){
    toastr.error('Please enter a firstname', 'Error!')
    return false
  }
  if(this.isEmpty(userData.lastname)){
    toastr.error('Please enter a lastname', 'Error!')
    return false
  }
  return true;
}

}
export default Validation;
