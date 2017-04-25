/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ViewAllUsers } from 
'../../../client/src/components/user/ViewAllUsers.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);

const paginateUsers = ()=> {
    return null
}

const getRoles = ()=> {
    return null
}

const wrapper = mount(
 <Provider store={store}>
    <ViewAllUsers users={[{
        username: 'document list',
        firstname: 'public'
        }]} 
        paginateUsers={paginateUsers}
        getRoles={getRoles}/>
  </Provider>
);


describe('ViewAllUsers component', () => {
  it('should mount the ViewAllUsers component', () => {
    expect(wrapper.containsMatchingElement(<ViewAllUsers />));
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('UserList').length).toBe(1);
    expect(wrapper.find('Pagination').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });

  it(`should have input field with id ="searchTerm" and an onChange property` ,
   () => {
    expect(wrapper.find('input').first().props().id).toEqual('searchTerms');
    expect(wrapper.find('input').first().props().onChange).toExist();   
  });

  it(`should have button field with an onClick property` ,
   () => {
    expect(wrapper.find('button').first().props().onClick).toExist();   
  });
});

