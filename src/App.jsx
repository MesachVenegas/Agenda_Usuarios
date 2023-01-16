import { useState, useEffect } from 'react'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState(false)
    const [status, setStatus] = useState(false)
    const [postStatus, setPostStatus] = useState('')

    const adduser = () =>{
        setNewUser(!newUser)
        setPostStatus('')
    }

    const getUsers = () => {
        axios.get('https://users-crud.academlo.tech/users/').then(res => setUsers(res.data))
    }

    const addUsers = (user) =>{
        axios.post(`https://users-crud.academlo.tech/users/`, user)
            .then(() =>{
                getUsers();
                setStatus(true);
            })
            .catch(res => {
                setPostStatus(res.response.statusText);
            })
        return status;
    }


    useEffect(()=>{
        getUsers()
    },[])

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
                <button className='btn btn-add' onClick={adduser}>
                    <i className="fa-solid fa-plus"></i>New User
                </button>
            </div>
            <div className="cards">
                <UsersList data={users}/>
            </div>
        </div>
    )
}

export default App
