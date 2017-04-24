/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { EditDocument } from 
'../../../client/src/components/EditDocument.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);

const params = {
    id: "1"
}
const viewDocument = ()=> {
    return null
}

const wrapper = mount(
 <Provider store={store}>
    <EditDocument params={params} viewDocument={viewDocument} />
  </Provider>
);


describe('EditDocument Page', () => {
  it('should mount the EditDocument component', () => {
    expect(wrapper.find('EditDocument').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    
  });

  it(`should have input field with id ="title" and an onChange property` ,
   () => {
    expect(wrapper.find('input').props().id).toEqual('title');
    expect(wrapper.find('input').props().onChange).toExist();   
  });
  it(`should have textarea field with id ="title" and an onChange property` ,
   () => {
    expect(wrapper.find('textarea').props().id).toEqual('content');
    expect(wrapper.find('textarea').props().onChange).toExist();   
  });
  it(`should have select field with id ="access", value and an 
  onChange property` ,() => {
    expect(wrapper.find('select').props().id).toEqual('access');
    expect(wrapper.find('select').props().onChange).toExist();   
  });
  it(`should have a button  with type ="submit"` ,() => {
    expect(wrapper.find('button').props().type).toEqual('submit');
    expect(wrapper.find('button').text()).toEqual('Save');   
  });
  it(`should have a form  with an onSubmit property` ,() => {
    expect(wrapper.find('form').props().onSubmit).toExist();  
  });
});
