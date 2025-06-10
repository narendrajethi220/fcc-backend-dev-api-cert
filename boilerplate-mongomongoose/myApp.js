const mongoose=require('mongoose');
require('dotenv').config({path:'./sample.env'});

const uri=process.env.MONGO_URI;
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});


const personSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:Number
  },
  favoriteFoods:[String]
})

let Person = mongoose.model('Person',personSchema);


const createAndSavePerson = async (done) => {
  try{
  const personInfo={
    name:"X",
    age:25,
    favoriteFoods:["Chocolate Oats","Milk","ButterMilk","Kari Chawal"]
  }
  const newPerson=new Person(personInfo);
  const savedPerson=await newPerson.save();
  done(null,savedPerson);
}
catch(err){
  done(err);
}
};
const createManyPeople = (arrayOfPeople, done) => {
  // console.log('Array of People',arrayOfPeople);
  Person.create(arrayOfPeople,(err,data)=>{
    if(err){
      return done(err);
    }
      done(null ,data);
  })
};

const findPeopleByName = (personName, done) => {
 Person.find({name:personName},(err,data)=>{
  if(err) return done(err);
  done(err,data);
 })
}

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err){
      return done(err);
    }
  done(null,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
  if(err) return done(err);
  done(null ,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,data)=>{
    if(err) return done(err);
   data.favoriteFoods.push(foodToAdd);
   data.save((err,data)=>{
    if(err) return done(err);
    return done(null,data);
   })    
  })
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},
    {$set:{age:ageToSet}},
    {new:true},(err,data)=>{
    if(err) return done(err);
    done(null,data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,data)=>{
    if(err) return done(err);
    done(null,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err) return done(err);
    done(null,data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const data=Person.find({favoriteFoods:foodToSearch}).sort({"name":1}).limit(2).select('-age').exec((err,data)=>{
    if(err) return done(err);
    done(null,data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
