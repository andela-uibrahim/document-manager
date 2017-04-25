/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ViewAllRoles } from 
'../../../client/src/components/role/ViewAllRoles.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);


const viewRoles = ()=> {
    return null
}

const wrapper = mount(
 <Provider store={store}>
    <ViewAllRoles 
        viewRoles={viewRoles}/>
  </Provider>
);


describe('ViewAllRoles component', () => {
  it('should mount the ViewAllRoles component', () => {
    expect(wrapper.containsMatchingElement(<ViewAllRoles />));
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('RoleList').length).toBe(1);
  });
});

