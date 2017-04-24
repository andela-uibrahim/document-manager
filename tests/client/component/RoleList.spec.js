/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import RoleList from 
'../../../client/src/components/RoleList.jsx';

const wrapper = shallow(<RoleList roles={[{
role: 'admin',
createdAt: '2017-04-22'} ]} />);

describe('RoleList component', () => {
  it('should mount the RoleList component', () => {
    expect(wrapper.containsMatchingElement(<RoleList />));
  });
  it('should be a table of RoleList', () => {
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('thead').length).toBe(1);
    expect(wrapper.find('th').length).toBe(3);
    expect(wrapper.find('tbody').length).toBe(1);
    expect(wrapper.find('td').length).toExist();
  });
  it('should have a table with an id', () => {
    expect(wrapper.props().id).toExist();
  });
  it(`should have a table with head that contains
   "Role", "Created on" and "Delete Role"`, () => {
    expect(wrapper.find('th').first().text()).toEqual('Role');
    expect(wrapper.find('th').at(1).text()).toEqual('Created on');
    expect(wrapper.find('th').last().text()).toEqual('Delete Role');
  });
  it(`should have a table with body that contains
details of each document with a formated date`, () => {
    expect(wrapper.find('td').at(0).text()).toEqual('admin');
    expect(wrapper.find('td').at(1).text()).toEqual('04/22/2017');
  });
});

