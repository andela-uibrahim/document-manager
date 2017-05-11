import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import actions from '../../../client/src/actions/userManagement/';
import types from '../../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatch USER_DELETED when User is deleted',
  () => {
    nock('http://localhost.com/')
      .delete('/api/Users/1')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.USER_DELETED,
        status: 'success' ,
        userid: '1'}]

    // const store = mockStore({ auth: {}, Users: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({});

    store.dispatch(actions.deleteUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch USER_CREATED when User is created',
  () => {
    nock('http://localhost.com/')
      .post('/api/Users')
      .reply(201, {
        body: {} 
    });

    const expectedActions = [{
        type: types.User_CREATED,
        message: 'success' }]

    // const store = mockStore({ auth: {}, Users: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({});
    const details = {
        username: 'docman',
        password: 'partiality',
        firstname: 'public',
        lastname: 'docman',
        email: 'admin@admin.com',
    }
    store.dispatch(actions.createUser(details))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch PAGINATED_USERS action when all Users',
  () => {
    nock('http://localhost.com/')
      .get('/api/Users')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.PAGINATED_USERS,
        Users: [],
        pageCount: '2',
        currentPage: '1', 
    }]

    // const store = mockStore({ auth: {}, Users: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.paginateUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch FIND_USER action when all Users',
  () => {
    nock('http://localhost.com/')
      .get('/api/search/Users/?search=we')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.FIND_USER,
        Users: [],
        pageCount: '2',
    }]

    // const store = mockStore({ auth: {}, Users: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.searchUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('dispatch VIEW_USER action when viewing a User Users',
  () => {
    nock('http://localhost.com/')
      .get('/api/Users/1')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.VIEW_User,
        Users: [],
    }]

    // const store = mockStore({ auth: {}, Users: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.viewUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch USER_UPDATED action when updating a Users',
  () => {
    nock('http://localhost.com/')
      .get('/api/users/1/Users/')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types. USER_UPDATED,
        Users: [],
    }]

        const store = mockStore({});
  
        store.dispatch(actions.editUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
