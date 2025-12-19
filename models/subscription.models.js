import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        requried:[true, 'Subscription name is required'],
        trim: true,
        minLength:2,
        maxLength: 100,
    },
    price:{
     type: Number,
     require:[true,'Subscription price is required'],
     min: [0, 'Price must be greater than zero']
    },
    currency: {
        type: String,
        enum:['USD','EUR','GBP'],
        default: 'USD',
    },
    frequency:{
      type:String,
      enum:['daily','weekly','bi-weekly','monthly','yearly']
    },
    category:{
        type: String,
        enum: ["sports",'news','entertainment','finance','lifestyle','technology','politics','other'],
        require: [true, 'Category is required']
    },
    paymentMethod:{
        type:String,
        required:[true, 'Payment method is required'],
        trim:true
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        require: true,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'The renwal must be after start date'
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        index:true,
    }
},{timestamps:true})

subscriptionSchema.pre('save', function (next){
    if(!this.renewalDate){
        const renewalTime = {
            daily:1,
            weekly:7,
            biWeekly:14,
            monthly:30,
            yearly:365,
        };
        this.renewalDate = new Date(this.startDate)
        this.renewalDate. setDate( this.renewalDate.getDate() + renewalTime[this.frequency] )
    }
    
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }
    next();
})

const Subscription = new mongoose.model('Subscription', subscriptionSchema)