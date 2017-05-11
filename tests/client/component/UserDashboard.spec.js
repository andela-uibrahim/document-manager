/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import UserDashboard from 
'../../../client/src/components/user/UserDashboard.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);

const verifyToken = ()=>{
  return null
}
const wrapper = mount(
 <Provider store={store}>
    <UserDashboard verifyToken={verifyToken}/>
  </Provider>
);


describe('UserDashboard component', () => {
  it('should mount the UserDashboard component', () => {
    expect(wrapper.containsMatchingElement(<UserDashboard />));
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('DocumentList').length).toBe(1);
    expect(wrapper.find('Pagination').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
  });

  it(`should have input field with id ="searchTerm" and an onChange property` ,
   () => {
    expect(wrapper.find('input').first().props().id).toEqual('searchTerms');
    expect(wrapper.find('input').first().props().onChange).toExist();   
  });

  it(`should have button field with an id="searchBtn" and an onClick property` ,
   () => {
    expect(wrapper.find('button').first().props().id).toEqual('searchBtn');
    expect(wrapper.find('button').first().props().onClick).toExist();   
  });
});

