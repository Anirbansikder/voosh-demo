import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './style.css'

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/getUserFromToken' , {
            headers : {
                authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(res.data.message != 'Successfully Validated')
                return navigate('/login')
        })
        .catch(err => {
            return navigate('/login')
        })
    },[]);
    const [item,setItem] = useState("");
    const [total,setTotal] = useState(0);
    const addOrder = (e) => {
        axios.post("/add-order",{
            "phoneNumber" : localStorage.getItem('phoneNumber'),
            "user_id" : localStorage.getItem('userId'),
            "item" : item,
            "subTotal" : total
        },{
            headers : {
                authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(res.data.message === "success"){
                window.alert("Order Added");
            } else {
                window.alert(res.data.message);
            }  
        })
        .catch(err => {
            console.log(err)
        })
    }
    const logout = () => {
        localStorage. removeItem('userId')
        localStorage. removeItem('token')
        localStorage. removeItem('phoneNumber')
        navigate('/login')
    }
    return (
        <div className="form">
            <div className="form-body">
                <div className="OrderName">
                    <label className="form__label" htmlFor="orderName">Order Name </label>
                    <input className="form__input" type="text" id="orderName" placeholder="Order Name..." value={item} onChange={(e) => setItem(e.target.value)}/>
                </div>
                <div className="total">
                    <label className="form__label" htmlFor="total">Total Order</label>
                    <input className="form__input" type="tel" id="total" placeholder="0" value={total} onChange={(e) => setTotal(e.target.value)}/>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={addOrder}>Add Order</button>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={() => navigate('/orders')}>See Your Orders</button>
            </div>
            <div className="LogOut">
                <button type="submit" className="btn" onClick={logout}>LogOut</button>
            </div>
        </div> 
    )
}

export default Dashboard;