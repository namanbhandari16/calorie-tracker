import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";
import { start } from 'repl';

const Calorie = (props) =>{
    const [food,setFood] = useState([])
    const [activity,setActivity] = useState([])
    const [state,setState] = useState({id:props.match.params.id})
    const [startDate, setStartDate] = useState(new Date());
    useEffect(()=>{
        const getData = async () =>{
            var {data} = await axios.get('/api/food')
            setFood(data)
            setState({...state,
                food:data[0].name})
             var {data}= await axios.get('/api/activity')
            console.log(data)
            setActivity(data)
            
        }
        getData()
    },[])
    console.log(state)
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
      const postreq = async(record) =>{
          console.log(record)
        const d=await axios.post('/api/record/insert',record)
        console.log(d)
      }
    const handleFood = (e) => {
        e.preventDefault()
        var cal=0
        for(var i =0;i<food.length;i++){
            if(food[i]._id===state.food){
                cal=food[i].calories*state.serving
                const record={id:state.id,date:Number(startDate.getDate()), month:Number(startDate.getMonth())+1, year:Number(startDate.getFullYear()),cal:cal}
                postreq(record)
            }
        }
    }
    const handleActivity = (e) => {
        e.preventDefault()
        var cal=0
        for(var i =0;i<activity.length;i++){
            if(activity[i]._id===state.activity){
                cal=activity[i].met*state.hour
                // const record={id:state.id,date:Number(startDate.getDate()), month:Number(startDate.getMonth())+1, year:Number(startDate.getFullYear()),cal:cal}
                // postreq(record)
                console.log(cal)
            }
        }
    }
    return <>
    <h2>Select Date</h2>
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      minDate={subDays(new Date(), 34)}
      maxDate={new Date()}
    />
    <h2>Add Food eaten</h2>
    <form onSubmit={handleFood}>
    <select name="food" className="form-control" onChange={handleChange}>
        {food && food.map(food=>(<option value={food._id} key={food._id}>{food.name}</option>))}
    </select>
    <input type="number" min='1' placeholder="Enter number of servings" required className="Form-control" name="serving" onChange={handleChange}/>
    <input type="submit" style={{backgroundColor:'rgba(254,166,3,1)',color:'red', fontWeight:'600', fontSize:'1.5em'}} className="form-control" value="Submit"/>
    </form>
    <h2>Add activities performed</h2>
    <form onSubmit={handleActivity}>
    <select name="activity" className="form-control" onChange={handleChange}>
        {activity && activity.map(ac=>(<option value={ac._id} key={ac._id}>{ac.name}</option>))}
    </select>
    <input type="number" min='1' placeholder="Enter number of hours" required className="Form-control" name="hour" onChange={handleChange}/>
    <input type="submit" style={{backgroundColor:'rgba(254,166,3,1)',color:'red', fontWeight:'600', fontSize:'1.5em'}} className="form-control" value="Submit"/>
    </form>
</>
}

export default Calorie;