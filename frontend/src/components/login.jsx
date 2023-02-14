import "./style.css"
import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const handleNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const login = (e) => {
        e.preventDefault();
        axios.post(`/login-user`,{
            "phoneNumber" : phoneNumber,
            "password" : password,
        })
        .then(res => {
            if(res.data.message === "Successfull SignIn"){
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.user_id)
                localStorage.setItem('phoneNumber',res.data.phoneNumber)
                return navigate('/')
            } else {
                window.alert(res.data.message);
            }  
        })
        .catch(err => {
            console.log(err)
        })
    }
    return(
        <div className="form">
            <div className="form-body">
                <div className="phoneNumber">
                    <label className="form__label" htmlFor="phoneNumber">Phone Number</label>
                    <input className="form__input" type="tel" id="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={handleNumberChange}/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={login}>Login</button>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={() => navigate('/add-user')}>Register</button>
            </div>
        </div>      
    )
}

export default Login;