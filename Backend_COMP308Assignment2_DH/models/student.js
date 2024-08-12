var mongoose= require("mongoose");


//create book model
let StudentSchema = new  mongoose.Schema(
    {
       
        studentNumber:{type: Number, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address:{type: String, required: true},
        city:{type: String, required: true},
        phoneNumber:{type:Number,required:true},
        email:{type: String, required: true},
        program:{type: String, required: true},

       
    },
    {
        timestamps:true
    }
);



module.exports = mongoose.model('Student', StudentSchema);

