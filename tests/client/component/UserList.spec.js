/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import UserList from 
'../../../client/src/components/UserList.jsx';

const wrapper = shallow(<UserList users={[{
firstname: 'usman',
lastname: 'ibrahim',
username: 'freemile',
email: 'test@test.com',
createdAt: '2017-04-22'} ]} />);

describe('UserList component', () => {
  it('should mount the UserList component', () => {
    expect(wrapper.containsMatchingElement(<UserList />));
  });
  it('should be a table of UserList', () => {
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('thead').length).toBe(1);
    expect(wrapper.find('th').length).toBe(5);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('td').length).toExist();
  });
  
  it(`should have a table with head that contains
   users property`, () => {
    expect(wrapper.find('th').first().text()).toEqual('First Name');
    expect(wrapper.find('th').at(1).text()).toEqual('Last Name');
    expect(wrapper.find('th').at(2).text()).toEqual('Username');
    expect(wrapper.find('th').at(3).text()).toEqual('Email');
    expect(wrapper.find('th').last().text()).toEqual('Registered on');
  });
  it(`should have a table with body that contains
details of each user with a formated date`, () => {
    expect(wrapper.find('td').at(2).text()).toEqual('ibrahim');
    expect(wrapper.find('td').at(3).text()).toEqual('freemile');
    expect(wrapper.find('td').at(4).text()).toEqual('test@test.com');
    expect(wrapper.find('td').at(6).text()).toEqual('04/22/2017');
  });
});

