import { useState, useEffect } from 'react'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import PopUp from './components/PopUp'
import axios from 'axios'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [countUsers, setCountUsers] = useState(0)
    const [isCreate, setIsCreate] = useState(false)
    const [isDeleted , setIsDeleted] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [selected, setSelected] = useState(null)
    const [message, setMessage] = useState("")

    const loadPopUp = (action) =>{
        switch(action){
            case 'create':
                getUsers();
                setIsCreate(true)
                setAddModal(false);
                setMessage("Creado")
                setTimeout(() => {
                    setIsCreate(false)
                    setMessage("")
                }, 3000)
                break;
            case 'update':
                getUsers();
                setIsUpdate(true)
                setAddModal(false);
                setMessage("Actualizado")
                setTimeout(() => {
                    setIsUpdate(false)
                    setMessage("")
                }, 3000)
                break;
            case 'delete':
                getUsers();
                setIsDeleted(true)
                setMessage("Eliminado")
                setTimeout(() => {
                    setIsDeleted(false)
                    setMessage("")
                }, 3000)
                break;
            default:
                return
        }
    }

    // Cambia el estado del controlador para mostrar el modal u no.
    const adduser = () =>{
        setAddModal(!addModal)
        setIsCreate('')
    }

    // selecciona un usuario para su posterior edición.
    const selectUser = (toSelect) =>{
            setSelected(toSelect)
            setAddModal(true)
    }

    // Trae la lista de usuarios en el API.
    const getUsers = () => {
        axios
            .get('https://users-crud.academlo.tech/users/')
            .then(res => setUsers(res.data))

    }

    // Creacon de usuario en la API.
    const addUsers = (user) =>{
        if(selected !== null){
            // https://users-crud.academlo.tech/users/3328/
            user.id = selected.id;
            axios.put(`https://users-crud.academlo.tech/users/${user.id}/`, user)
                .then( () => loadPopUp("update") )
                .then( () => setSelected(null) )
                .catch(res => console.log(res.response));
        }else{
            axios.post(`https://users-crud.academlo.tech/users/`, user)
                .then( () => loadPopUp("create") )
                .catch(res => console.log( res.response) );
        }
    }

    // Elimina un usuario de la API
    const deleteUser = (toDelete) =>{
        axios.delete(`https://users-crud.academlo.tech/users/${toDelete.id}/`)
        .then( () => loadPopUp("delete") )
        .catch( res => console.log(res.response))
    }

    useEffect(()=>{
            getUsers()
        },[])


    return (
        <div className="App">
            { ( isDeleted || isCreate || isUpdate) && <PopUp message={ message }/>}
            {
                addModal
                &&
                <UsersForm
                    addUsers={ addUsers }
                    addModal={ addModal }
                    setAddModal={ setAddModal }
                    selected={ selected }
                    setSelected = { setSelected }
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
                <UsersList
                    data={ users }
                    setCountUsers={ setCountUsers }
                    loadUsers={ getUsers }
                    selectUser= { selectUser }
                    deleteUser={ deleteUser }
                />
            </div>
        </div>
    )
}

export default App
