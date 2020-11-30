const express = require('express')
const router= express.Router();
const User = require('../models/userModel')

router.post('/register', (req,res) =>{
    const err={}
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            err.email='Email already exists'
            return res.status(512).json(err)
        }
        else{
            var bmr
            if(req.body.gender==='Male')
            bmr=66.4730 + (13.7516*req.body.weight) + (5.0033*req.body.height) - (6.7550*req.body.age)
            else bmr=655.0955 + (9.5634*req.body.weight) + (1.8496*req.body.height) - (4.6756*req.body.age)
            const newUser= new User({
                name: req.body.name,
                email:req.body.email,
                age:req.body.age,
                weight:req.body.weight,
                height:req.body.height,
                gender:req.body.gender,
                bmr:bmr
            })
        newUser.save()
		.then(user =>res.json(user))
		.catch(err =>console.log(err))
        }
    })
})

router.get('/getall', (req,res) => {
    const errors={}
    User.find({})
    .then(users => {
      if (!users) {
        errors.nouser = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({ user: 'There are no profiles' }));
})

router.get('/get/:id',(req,res) => {
    const error={}
    User.findOne({ _id: req.params.id })
    .then(user => {
      if (!user) {
        errors.nouser = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch(err => res.status(404).json(err));
})

module.exports=router;