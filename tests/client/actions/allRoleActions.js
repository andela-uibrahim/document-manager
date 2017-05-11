import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import actions from '../../../client/src/actions/roleManagement/';
import types from '../../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Role Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatch ROLE_DELETED when Role is deleted',
  () => {
    nock('http://localhost.com/')
      .delete('/api/Roles/1')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.ROLE_DELETED,
        status: 'success' ,
        roleId: '1'}]

    // const store = mockStore({ auth: {}, Roles: [],
    // Roles: [], search: [], paginate: {}, Role: [] });
    const store = mockStore({});

    store.dispatch(actions.deleteRole(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch ROLE_CREATED when Role is created',
  () => {
    nock('http://localhost.com/')
      .post('/api/Roles')
      .reply(201, {
        body: {} 
    });

    const expectedActions = [{
        type: types.ROLE_CREATED,
        status: 'success',
        role: 'docman' 
    }]

    // const store = mockStore({ auth: {}, Roles: [],
    // Roles: [], search: [], paginate: {}, Role: [] });
    const store = mockStore({});
    const details = {
        role: 'docman',
    }
    store.dispatch(actions.newRole(details))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch ALL_ROLES action when all Roles',
  () => {
    nock('http://localhost.com/')
      .get('/api/Roles')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.ALL_ROLES,
        roles: [],
        pageCount: '2',
        currentPage: '1', 
    }]

    // const store = mockStore({ auth: {}, Roles: [],
    // Roles: [], search: [], paginate: {}, Role: [] });
        const store = mockStore({});
  
        store.dispatch(actions.viewAllRoles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
