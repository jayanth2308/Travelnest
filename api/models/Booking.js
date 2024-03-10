const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place :{type:mongoose.Schema.Types.ObjectId, ref:'Place',required : true},
    user:{type:mongoose.Types.ObjectId,required:true},
    checkIn:{type :Date, required :true},
    checkOut:{type :Date, required :true},
    maxGuests:{type :String, required :true},
    sname:{type :String, required :true},
    phone:{type :String, required :true},
    Price:Number,
});

const BookingModel = mongoose.model('Booking',bookingSchema);

module.exports = BookingModel;