/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

const confirmDeletion = (callback, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this user?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(userId);
      swal('Deleted!', 'The user has been deleted.', 'success');
    } else {
      swal('Cancelled!', 'The user was not deleted.', 'error');
    }
  });
};

const confirmUpdateRole = (callback, roleId, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to change this user\'s role?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, update it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(roleId, userId);
      swal('Updated!', 'The user\'s role has been updated.', 'success');
    } else {
      swal('Cancelled!', 'The user\'s role was not changed.', 'error');
    } 
  });
};
const UserList = ({ users, deleteUser, roles, updateUserRole, roleId }) => {
  return (
      <table className="highlight doc_list z-depth-4 panel pagination">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            {roleId === 1 ?
            <th>Role</th>:<td />}
            <th>Registered on</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => {
          return (
            <tr key={user.id} > 
              <td><Link to={`/users/${user.id}`} >{user.firstname} </Link></td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {roleId === 1 ?
              <td>
                { user.RoleId !== 1 ?
                  <select
                    className="userRoleSelect browser-default"
                    onChange={event => confirmUpdateRole(updateUserRole,
                     event.target.value, user.id)}
                    value={user.RoleId}
                  >
                    {roles.map(role =>
                      <option key={role.id} value={role.id}>{role.role}</option>
                    )}
                  </select>
                : <span />
                }
              </td>:<td />}
              
              <td>{moment(user.createdAt).format('L')}</td>
              { roleId === 1 ?
              <td>
              { user.RoleId !== 1 ?
                <Link onClick={() => confirmDeletion(deleteUser, user.id)}>
                  <i className="small material-icons">delete</i>
                </Link>
                : <span />
              }
              </td>:<td /> }
            </tr>
          )
          })
          }

        </tbody>
      </table>
  );
};


UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  roles: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUserRole: React.PropTypes.func.isRequired
};

export default UserList;
