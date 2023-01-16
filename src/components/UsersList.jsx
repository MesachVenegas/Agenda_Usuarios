import { useState } from 'react';
import axios from 'axios';

const UsersList = ({data, loadUsers, showPopup}) => {
    const [selectedUser, setSelectedUser] = useState( {} )
    const [deleteState, setDeleteState] = useState(false)

    const deleteUser = (userSelected) =>{
        data.forEach(user => {
            if(user.id === userSelected){
                axios
                    .delete(`https://users-crud.academlo.tech/users/${userSelected}/`)
                    .then( () =>{
                        loadUsers()
                        setDeleteState(true)
                        showPopup(deleteState)
                    })
                    .catch(res => console.log(res.response))
            }
        })
    }



    return data?.map(user =>(
        <div className='CardUser' key={user.id}>
            <div className="user_data">
                <p className="name">
                    {`${user.first_name} ${user.last_name}`}
                </p>
                <p className="email">{user.email}</p>
                <p className="birthday">
                    <i className="fa-solid fa-cake-candles"></i> {user.birthday}
                </p>
            </div>
            <div className="user_admin">
                <span className='btn btn-edit' >
                    <i className="fa-solid fa-pen"></i>
                </span>
                <span className='btn btn-trash' onClick={() => deleteUser(user.id)}>
                    <i className=" fa-solid fa-trash "></i>
                </span>
            </div>
        </div>
        )
    );
};

export default UsersList;