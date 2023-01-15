import React from 'react';

const UsersList = ({data}) => {

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
                <span className='btn btn-edit'>
                    <i className="fa-solid fa-pen"></i>
                </span>
                <span className='btn btn-trash'>
                    <i className=" fa-solid fa-trash "></i>
                </span>
            </div>
        </div>
        )
    );
};

export default UsersList;