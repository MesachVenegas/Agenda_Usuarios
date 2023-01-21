import { useEffect, useState} from 'react';
import './style/usersForm.css'


const UsersForm = ({ addUsers, addModal, setAddModal, selected }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')

    useEffect( () => {
        if(selected !== null){
            setFirstName( selected.first_name )
            setLastName( selected.last_name )
            setEmail( selected.email )
            setPassword( selected.password )
            setBirthday( selected.birthday )
        }
        else{
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setBirthday("")
        }
    },[selected])

    // Al presionar subir toma los datos de los inputs en un objeto y los ingesa a las API
    const submit = e =>{
        e.preventDefault();
        const preUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthday: birthday
        }
        addUsers(preUser)
    }

    return (
        <div className='UserForm'>
            <form className='formUser' onSubmit={submit}>
                <div className="btn btn-close" onClick={() => setAddModal(!addModal)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <h2>New User</h2>

                <div className="box">
                    <label htmlFor="first-name">
                        <i className="fa-solid fa-user"></i>
                    </label>
                    <input
                        id='first-name'
                        type="text"
                        placeholder='First Name'
                        value={firstName}
                        onChange={e =>  setFirstName(e.target.value) }
                        required
                    />
                </div>
                <div className="box">
                    <input
                        type="text"
                        placeholder='Last Name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="box">
                    <label htmlFor="email">
                        <i className="fa-solid fa-envelope"></i>
                    </label>
                    <input
                        id='email'
                        type="email"
                        placeholder='email'
                        value={ email }
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="box">
                    <label htmlFor="password">
                        <i className="fa-solid fa-lock"></i>
                    </label>
                    <input
                        id='password'
                        type="password"
                        placeholder='password'
                        autoComplete='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="box">
                    <label htmlFor="birthday">
                        <i className="fa-solid fa-cake-candles"></i>
                    </label>
                    <input
                        id='birthday'
                        type="date"
                        name="birthday"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <div className="box">
                    <button className="btn btn-submit" type='submit'>
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UsersForm;