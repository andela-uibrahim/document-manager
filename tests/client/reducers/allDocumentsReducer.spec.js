import expect from 'expect';
import types from '../../../client/src/actions/actionTypes';
import allDocumentsReducer from 
'../../../client/src/reducers/allDocumentsReducer';

describe('allDocumentsReducer', () => {
  const documents = [
    {id: '1', title: 'usman'},
    {id: '2', title: 'freemile'}, 
    {id: '3', title: 'ibrahim'}];

  const pageCount = '1';
  describe('PAGINATED_DOCUMENTS', () => {
    it('should return a list of Documents and a pageCount detail', () => {
      const initialState = {};
      const paginateDocumentsDispatch = {
          type: types.PAGINATED_DOCUMENTS,
          documents,
          pageCount,
      };
      const action = paginateDocumentsDispatch;
      const newState = allDocumentsReducer(initialState, action);

      expect(newState.documents).toEqual(paginateDocumentsDispatch.documents);
      expect(newState.pageCount).toEqual(paginateDocumentsDispatch.pageCount);
    });
  });

  describe('VIEW_DOCUMENT', () => {
    it('should return a documents\'s details', () => {
      const initialState = {};
      const viewDocumentDispatch = {
          type: types.VIEW_DOCUMENT,
          document: documents[1],
      };
      const action = viewDocumentDispatch;
      const newState = allDocumentsReducer(initialState, action);
      expect(newState.document).toEqual(viewDocumentDispatch.document);
    });

  });

  describe('DOCUMENT_DELETED', () => {
    it('should return a user\'s updated detail', () => {
      const initialState = { documents };
      const deleteDocumentDispatch = {
          type: types.DOCUMENT_DELETED,
          status: 'success',
          documentid: '1'
      };
      const action = deleteDocumentDispatch;
      const newState = allDocumentsReducer(initialState, action);
      expect(newState.documents).toEqual(documents.slice(1));
    });

  });

  it('should return initial state if no action is passed', () => {
    const initialState = {};
    const action = {};
    const newState = allDocumentsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

});

