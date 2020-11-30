import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const User = () => {
    const [user,setUser]= useState({})
    const [id,setid]=useState('')
    useEffect(() =>{
        const getUser = async() =>{
             var id1=window.location.pathname.slice(6)
             setid(id1)
            const data= await axios.get('/api/users/get/'+id1)
            setUser(data.data)
        }
        getUser()
    },[]);
    var bmr
    if(user.bmr) bmr=user.bmr.toFixed(2)
    return <> 
    <p>{user.name}</p>
    <p>{user.email}</p>
    <p>{user.age} years old</p>
    <p>{user.gender}</p>
    <p>{user.weight} kg</p>
    <p>{user.height} cm</p>
    <p>BMR: {user && bmr} calories</p>
    <Link to={{pathname:`/user/${id}/calories`, state:{user:id}}} className="reg">Compute Calories</Link>
    </>
}
export default User;