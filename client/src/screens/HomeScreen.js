import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useHistory}from 'react-router-dom'

const HomeScreen = () =>{
    const [users, setUsers] = useState([])
    let history=useHistory()
    useEffect(()=>{
        const getUsers = async () =>{
            const {data} = await axios.get('/api/users/getall');
            setUsers(data)
        }
        getUsers()
    },[]);
    const handleUser = (e) => {
        var id=e.currentTarget.dataset.id
        history.push('/user/'+id)
    }
    return <>
    <div class="row">
    {users.map(user=>(<div class="item"><button data-id={user._id} onClick={handleUser}>{user.name}</button></div>))}
    </div>
    <Link to="/register" className="reg">Register New User</Link>
    </>
}

export default HomeScreen;