import { useState, useEffect } from 'react'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import DeletePopUp from './components/DeletePopUp'
import axios from 'axios'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState(false)
    const [status, setStatus] = useState(false)
    const [countUsers, setCountUsers] = useState(0)
    const [postStatus, setPostStatus] = useState('')
    const [deleteStatus, setDeleteStatus] = useState(false)

    const adduser = () =>{
        setNewUser(!newUser)
        setPostStatus('')
    }

    const getUsers = () => {
        axios
            .get('https://users-crud.academlo.tech/users/')
            .then(res => setUsers(res.data))
    }

    const addUsers = (user) =>{
        axios.post(`https://users-crud.academlo.tech/users/`, user)
            .then( res =>{
                getUsers();
                setStatus(true)
                setTimeout(() =>{
                    setNewUser(false);
                }, 1000)
                console.log(res);
            })
            .catch(res => {
                setPostStatus(res.response);
            })
        return status;
    }


    useEffect(()=>{
            getUsers()
        },[])

    console.log( deleteStatus );

    return (
        <div className="App">
            {
                newUser
                &&
                <UsersForm
                    addUsers={addUsers}
                    message={postStatus}
                    newUser={newUser}
                    setNewUser={setNewUser}
                />
            }

            <div className="header">
                <h1>Users</h1>
                <div className="header_status">
                    <span>
                        Registered Users: {countUsers}
                    </span>
                    <button className='btn btn-add' onClick={adduser}>
                        <i className="fa-solid fa-plus"></i>New User
                    </button>
                </div>
            </div>
            <div className="cards">
                <UsersList data={users} loadUsers={getUsers} setDeleteState={setDeleteStatus}/>
            </div>
        </div>
    )
}

export default App
