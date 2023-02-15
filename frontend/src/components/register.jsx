import "./style.css"
import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const register = async(e) => {
        if(name === ''){
            window.alert("Name Should Be Valid");
            return;
        }
        const re = /^\d{10}$/;
        if(re.test(phoneNumber) === false){
            window.alert("Enter Valid Phone Number");
            return;
        }
        if(password === ''){
            window.alert("Set Valid Password");
            return;
        }
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/add-user",{
            "name" : name,
            "phoneNumber" : phoneNumber,
            "password" : password,
        })
        if(res.data.message === "Successfull SignUp"){
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.user_id)
            localStorage.setItem('phoneNumber',res.data.phoneNumber)
            return navigate('/')
        } else {
            window.alert(res.data.message);
        }
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="name">User Name </label>
                    <input className="form__input" type="text" id="name" placeholder="User Name" value={name} onChange={handleNameChange}/>
                </div>
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
                <button type="submit" className="btn" onClick={register}>Register</button>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>      
    )
}

export default Register;