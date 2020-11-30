import React, {useState} from'react'
import axios from 'axios'
import {useHistory}from 'react-router-dom'
const Register = () =>{
    const [state, setState] = useState({name:'', email:'', age:0, weight:0, height:0,gender:'Male'})
    let history=useHistory()
    const [msg,setmsg] = useState('')
    const handleSubmit = (e) =>{
        axios.post('/api/users/register',state)
        .then(res => history.push('/'))
        .catch(error => setmsg('Email already registered'))
        e.preventDefault();
    }
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
return <form onSubmit={handleSubmit}>
    <input type="text" class="form-control" name="name" placeholder="Name" required onChange={handleChange}/>
    <input type="email" class="form-control" name="email" placeholder="E-mail" required onChange={handleChange}/>
    <input type="number" name="age" class="form-control" placeholder="Age" required onChange={handleChange}/>
    <input type="number" name="weight" class="form-control" placeholder="Weight (in kg)" required onChange={handleChange}/>
    <input type="number" name="height" class="form-control" placeholder="Height (in cm)" required onChange={handleChange}/>
    <select name="gender" className="form-control" onChange={handleChange}>
      <option disabled>select an</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    <input type="submit" style={{backgroundColor:'rgba(254,166,3,1)',color:'red', fontWeight:'600', fontSize:'1.5em'}}class="form-control" value="Submit"/>
    <p style={{color:'red'}}>{msg}</p>
</form>
}

export default Register; 