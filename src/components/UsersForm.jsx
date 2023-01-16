import { useState} from 'react';
import './style/usersForm.css'


const UsersForm = ({addUsers, message, newUser, setNewUser}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [resolution, setResolution] = useState(false)
    const [bg, setBg] = useState(false)

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
        // Si la funcion que agrega el resultado retorna true
        if(addUsers(preUser)){
            // Cambia el estado de la resolución a true, para cambiar el mensaje mostrado en el btn del formulario.
            setResolution(true)
            setBg(true)
        }
    }

    return (
        <div className='UserForm'>
            <form className='formUser' onSubmit={submit}>
                <div className="btn btn-close" onClick={() => setNewUser(!newUser)}>
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
                        value={email}
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
                    <button className={`btn btn-submit ${bg ? 'active' : ''}`} type='submit'>
                        {
                            resolution ?
                                (<span><i className="fa-solid fa-circle-check"></i> Ready</span>)
                            : 'Upload'
                        }
                        </button>
                </div>
                <div className={message ? 'error' : ''}>
                    {message? message: ''}
                </div>
            </form>
        </div>
    );
};

export default UsersForm;