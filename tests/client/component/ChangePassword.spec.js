/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { ChangePassword } from 
'../../../client/src/components/user/ChangePassword.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);

const verifyToken = ()=>{
  return null
}
const wrapper = mount(
 <Provider store={store}>
    <ChangePassword verifyToken={verifyToken} />
  </Provider>
);


describe('ChangePassword Page', () => {
  it('should mount the ChangePassword component', () => {
    expect(wrapper.find('ChangePassword').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    
  });

  it(`should have input field with id ="password" and an onChange property` ,
   () => {
    expect(wrapper.find('input').props().id).toEqual('password');
    expect(wrapper.find('input').props().onChange).toExist();   
  });
  
  it(`should have a button  with type ="submit"` ,() => {
    expect(wrapper.find('button').props().type).toEqual('submit');
    expect(wrapper.find('button').text()).toEqual('Update password');   
  });
  it(`should have a form  with an onSubmit property` ,() => {
    expect(wrapper.find('form').props().onSubmit).toExist();  
  });
});
