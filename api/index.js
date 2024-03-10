const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer =require('multer');
const User = require('./models/User');
const Place = require('./models/Place');
const fs=require('fs');
const path = require('path');
const Booking = require('./models/Booking');
mongoose.connect('mongodb+srv://jayanth:TawlYHUDtztLTT51@cluster0.lajaoun.mongodb.net/?retryWrites=true&w=majority')

const app= express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'jayanth' 

app.get('/test',(req,res)=>{
    res.json('test ok')
})

app.post('/register',async(req,res)=>{
   const{name,email,password} = req.body;

   try{
        const userDoci = await User.create({
            name:name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json({userDoci});
   }
   catch(e){
    res.status(422).json(e);
   }
   
    
})

app.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    const userDoc = await User.findOne({email:email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
               if(err) throw err;
               res.cookie('token',token).json(userDoc);
            });
        }else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');
    }
})

app.get('/profile',(req,res)=>{
    const {token} =req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173'); 
            res.json({name,email,_id})
        });
    }else{
        res.json(null);
    }
    
})

app.post('/logout', (req, res) => {
    res.clearCookie('token').json(true);
    console.log(res); // Clear token cookie
});




console.log({__dirname});
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'Photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '\\uploads\\' + newName,
    });
    
    const imageURL = '/uploads/' + newName; // Constructing the URL
    res.json(imageURL);
});



const photosMiddleware = multer({ dest: 'A:\\Airbnb\\api\\uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const newPath = `A:\\Airbnb\\api\\uploads\\${originalname}`;
        fs.renameSync(path, newPath);
        uploadedFiles.push(originalname); // Store only the filename
    }

    // Construct URLs with just the filename
    const uploadedFileURLs = uploadedFiles.map(filename => `/uploads/${filename}`);
    
    res.json(uploadedFileURLs);
});





app.post('/places',(req,res)=>{
    const {title,address,addedPhotos,description,Price,
        perks,extraInfo,checkIn,checkOut,maxGuests,
    }=req.body;

    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            Price,
            title,
            address,
            photos:addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        });
        res.json(placeDoc);
    });
});


// app.get('/places',(req, res) => {
//     const { token } = req.cookies;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//         if (err) {
//             res.status(401).json({ error: 'Unauthorized' });
//         } else {
//             const { id } = userData; // Destructuring userData to access id
//             try {
//                 res.json(await Place.find({ owner: id }));
//             } catch (error) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//             }
//         }
//     });
// });


app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})


app.put('/places', async (req, res) => {
    const { id, title, address, addedPhotos, description, extraInfo, perks, checkIn, checkOut, maxGuests, Price } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            try {
                const placeDoc = await Place.findById(id);
                if (userData.id == placeDoc.owner.toString()) {
                    placeDoc.set({
                        title, address, description, extraInfo,
                        perks, checkIn, checkOut, maxGuests, Price,
                    });
                    if (addedPhotos && addedPhotos.length > 0) {
                        // Update the list of photos
                        placeDoc.photos = addedPhotos;
                    }
                    await placeDoc.save();
                    res.json(placeDoc); // Return the updated place data
                } else {
                    res.status(403).json({ error: 'Forbidden' }); // User is not the owner of the place
                }
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' }); // Error occurred while updating place
            }
        }
    });
});


app.get('/places',async (req,res)=>{
    res.json(await Place.find());
})
// bookings
app.post('/bookings',(req,res) =>{
    const {token} = req.cookies;
    const{place,checkIn,checkOut,maxGuests,sname,phone,Price} = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData) =>{
        if(err) throw err;
        const bookingDoc = await Booking.create({
            place,checkIn,checkOut,maxGuests,sname,phone,Price,user:userData.id,
        });
        res.json(bookingDoc);
    })
})

function getUserData(req){
    return new Promise((resolve,reject) =>{
        const {token} = req.cookies;
        jwt.verify(token,jwtSecret,{},(err,userData)=>{
            if(err) throw err;
            resolve(userData);
        })
    })
}

app.get('/bookings',async (req,res)=>{
    const userDocu= await getUserData(req);
    res.json(await Booking.find({user:userDocu.id}).populate('place'))
})


app.listen(4048,console.log('server started'));