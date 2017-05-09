/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import DocumentList from 
'../../../client/src/components/document/DocumentList.jsx';

const verifyToken = ()=>{
  return null
}
const wrapper = shallow(<DocumentList documents={[{
title: 'document list',
access: 'public',
createdAt: '2017-04-22'} ]} />);

describe('DocumentList component', () => {
  it('should mount the DocumentList component', () => {
    expect(wrapper.containsMatchingElement(<DocumentList />));
  });
  it('should be a table of DocumentList', () => {
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
   "title", "access" and published on`, () => {
    expect(wrapper.find('th').first().text()).toEqual('Title');
    expect(wrapper.find('th').at(1).text()).toEqual('Access');
    expect(wrapper.find('th').last().text()).toEqual('Published on');
  });
  it(`should have a table with body that contains
details of each document with a formated date`, () => {
    expect(wrapper.find('td').at(1).text()).toEqual('public');
    expect(wrapper.find('td').at(2).text()).toEqual('04/22/2017');
  });
});

