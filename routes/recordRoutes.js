const express = require('express')
const router= express.Router();
const Food = require('../models/foodModel')
const Activity = require('../models/activityModel')
const Record = require('../models/recordModel')
router.get('/food',(req,res)=>{
    const errors={}
    Food.find({})
    .then(foods => {
      if (!foods) {
        errors.nofood = 'There are no foods';
        return res.status(404).json(errors);
      }
      res.json(foods);
    })
    .catch(err => res.status(404).json({ food: 'There are no foods' }));
})

router.get('/activity',(req,res)=>{
    const errors={}
    Activity.find({})
    .then(ac => {
      if (!ac) {
        errors.noactivity = 'There are no activities';
        return res.status(404).json(errors);
      }
      res.json(ac);
    })
    .catch(err => res.status(404).json({ activity: 'There are no activities' }));
})

router.post('/record/insert',(req,res) => {
  const errors={}
  Record.findOne({user:req.body.id, date:req.body.date, month:req.body.month, year:req.body.year})
  .then(rec => {
    if(!rec){
      var newRec
      if(req.body.cal>0){
        newRec = new Record({
        user:req.body.id,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        caloriein:req.body.cal,
        calorieout:0
      })
    }
    else{
      var cal=req.body.cal*-1;
       newRec = new Record({
        user:req.body.id,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        caloriein:0,
        calorieout:cal
      })
    }
    newRec.save()
		.then(user =>res.json(user))
		.catch(err =>console.log(err))
    }
    else{
      var cal=req.body.cal
      if(cal>0)
      Record.findOneAndUpdate({user:req.body.id, date:req.body.date, month:req.body.month, year:req.body.year},
        {$inc:{caloriein:cal}},
        {new:true})
      .then(rec=>res.json(rec))
      else{
        cal=cal*-1
        Record.findOneAndUpdate({user:req.body.id, date:req.body.date, month:req.body.month, year:req.body.year},
          {$inc:{calorieout:cal}},
          {new:true})
        .then(rec=>res.json(rec))
      }
    }
  })
})

module.exports=router;