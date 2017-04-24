/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { CreateRole } from 
'../../../client/src/components/CreateRole.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);


const wrapper = mount(
 <Provider store={store}>
    <CreateRole />
  </Provider>
);


describe('CreateRole Page', () => {
  it('should mount the CreateRole component', () => {
    expect(wrapper.find('CreateRole').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    
  });

  it(`should have input field with id ="role" and an onChange property` ,
   () => {
    expect(wrapper.find('input').props().id).toEqual('role');
    expect(wrapper.find('input').props().onChange).toExist();   
  });
  
  it(`should have a button  with type ="submit"` ,() => {
    expect(wrapper.find('button').props().type).toEqual('submit');
    expect(wrapper.find('button').text()).toEqual('Save');   
  });
  it(`should have a form  with an onSubmit property` ,() => {
    expect(wrapper.find('form').props().onSubmit).toExist();  
  });
});
