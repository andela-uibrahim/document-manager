/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const confirmDeletion = (callback, documentId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this document?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(documentId);
      swal('Deleted!', 'Your document has been deleted.', 'success');
    } else {
      swal('Cancelled!', 'Your document  was not deleted.', 'error');
    }
  });
};

const DocumentList = ({ documents, userid, roleId, deleteDocument }) => {
  if (documents === []){
    return (
      <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-red">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-yellow">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>

            <div class="spinner-layer spinner-green">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
    )
  }
  return (
      <table id="document-list"
       className="highlight doc_list z-depth-4 panel pagination">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access</th>
            <th>Published on</th>
          </tr>
        </thead>

        <tbody>
          {documents.map(document =>
            <tr key={document.id}>
              <td className="doc-title"> <Link
               to={`/view-document/${document.id}`}>{document.title}
               </Link>
               </td>
              <td>{document.access}</td>
              <td>{moment(document.createdAt).format('L')}</td>
              {
                ((userid === document.UserId || roleId === 1) ?
                  <td><Link to={`/edit-document/${document.id}`}>
                    <i className="small material-icons edit-btn">
                      mode_edit
                      </i>
                      </Link>
                      </td>
                  : <td />
                )}
              {
                ((userid === document.UserId || roleId === 1) ?
                  <td><Link 
                    onClick={() => 
                    confirmDeletion(deleteDocument, document.id)}>
                    <i className="small material-icons delete-btn">
                      delete</i></Link></td>
                  : <td />
                )}
            </tr>
          )}
        </tbody>
      </table>
  );
};


DocumentList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  userid: React.PropTypes.number,
  roleId: React.PropTypes.number,
  deleteDocument: React.PropTypes.func
};

export default DocumentList;
