//const mongoose = require('mongoose');
/*mongoose.connect('mongodb://localhost/mongo-exercise')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log(`Error is : ${err}`))
*'/
const courseSchema = new mongoose.Schema({
    name: {type: String, required:true},
    category: {type:String,enum:['web','mobile','network']},
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        validate:{
            isAsync: true,
            validator: function(p, callback) {
                if(true){
                    callback(()=> {console.log("i am here")})
                }
            },
            message:"The price should be greater than 15 if isPublished is true"
        }
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name:'React Js',
        //category:'-',
        author:'mosh',
        tags:['React','Frontend'],
        isPublished: false,
        price: 15
    })
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(err) {
        console.log(`Error is: ${err.message}`)
    }
    
}

createCourse();


async function updateDocument(id){
    console.log(id);
    const course = await Course.findById(id);
    console.log(course);
    course.name = 'Express.jss Course';
    course.price = 15;
    
    course.save();
}

async function updateDocumentWithoutId(id){
   const result =  await Course.findByIdAndUpdate(id,{
       $set:{
           author: 'Shashank',
           price: 10
       }
   }, {new : true});
   console.log(result);
}

async function removeDocumentFromCourseCollection(id){
    await Course.removeById(id);
}



//updateDocumentWithoutId("5a68fdd7bee8ea64649c2777");