/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import logout from '../../../client/src/actions/authentication/logOutAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates CLEAR_ALL action when user has logged out',
  () => {
    const expectedActions = [
      { type: 'CLEAR_ALL',
        documents: [],
        },
    ];

    const store = mockStore({});
    store.dispatch(logout())
    expect(store.getActions()).to.eql(expectedActions);
  });
});