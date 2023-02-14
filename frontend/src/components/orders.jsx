import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './style.css'

const Orders = () => {
    const navigate = useNavigate();
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        axios.get(`/get-order?user_id=${localStorage.getItem('userId')}`,{
            headers : {
                authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(userData => {
            if(userData.data.message != 'success')
                return navigate('/login')
            setItems(items => [...items,userData.data.orders])
            setLoading(true);
        })
        .catch(err => {
            window.alert(err)
            navigate('/login')
        })
    },[]);
    const logout = () => {
        localStorage. removeItem('userId')
        localStorage. removeItem('token')
        localStorage. removeItem('phoneNumber')
        navigate('/login')
    }
    return(
        <>  
            {loading === true ? 
                <div className="form">
                    <div className='headerText'>Here Are Your Orders : </div>
                    {items[0].map(({ orderName, total }) => {
                        return <p key={orderName}>Item Name {orderName} has been ordered {total} times.</p>
                    })}
                    <div className="footer">
                        <button type="submit" className="btn" onClick={() => navigate('/')}>Add More Orders</button>
                    </div>
                    <div className="LogOut">
                        <button type="submit" className="btn" onClick={logout}>LogOut</button>
                    </div>
                </div> : <></>}
        </>
    )
}

export default Orders;