/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { SignUpPage } from 
'../../../client/src/components/SignUp.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);


const wrapper = mount(
 <Provider store={store}>
    <SignUpPage />
  </Provider>
);


describe('SignUpPage Page', () => {
  it('should mount the SignUpPage component', () => {
    expect(wrapper.find('SignUpPage').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(5);
    expect(wrapper.find('button').length).toBe(1);
    
  });

  it(`should have input field with id ="username" and an onChange property` ,
   () => {
    expect(wrapper.find('input').first().props().id).toEqual('username');
    expect(wrapper.find('input').first().props().onChange).toExist();   
  });
  it(`should have input field with id ="firstname" and an onChange property` ,
   () => {
    expect(wrapper.find('input').at(1).props().id).toEqual('firstname');
    expect(wrapper.find('input').at(1).props().onChange).toExist();   
  });
  it(`should have input field with id ="lastname" and an onChange property` ,
   () => {
    expect(wrapper.find('input').at(2).props().id).toEqual('lastname');
    expect(wrapper.find('input').at(2).props().onChange).toExist();   
  });
  it(`should have input field with id ="email" and an onChange property` ,
   () => {
    expect(wrapper.find('input').at(3).props().id).toEqual('email');
    expect(wrapper.find('input').at(3).props().onChange).toExist();   
  });

  it(`should have input field with id ="password" and an onChange property` ,
   () => {
    expect(wrapper.find('input').at(4).props().id).toEqual('password');
    expect(wrapper.find('input').at(4).props().onChange).toExist();   
  });
  
  it(`should have a button  with type ="submit"` ,() => {
    expect(wrapper.find('button').props().type).toEqual('submit');
    expect(wrapper.find('button').text()).toEqual('Register');   
  });
  it(`should have a form  with an onSubmit property` ,() => {
    expect(wrapper.find('form').props().onSubmit).toExist();  
  });
});
