import { useState } from 'react';
import './style/usersForm.css'


const UsersForm = ({addUser, message}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [resolution, setResolution] = useState(false)
    const [bg, setBg] = useState(false)

    const submit = e =>{
        e.preventDefault();
        const preUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            birthday: birthday
        }
        if(addUser(preUser)){
            setResolution(true)
            setBg(true)
        }
    }

    return (
        <div className='UserForm'>
            <form className='formUser' onSubmit={submit}>
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