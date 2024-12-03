const express = require ('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const users = require('../models/users');
const fs = require('fs');
const { type } = require('os');


// image upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+file.originalname);
    }
})

let upload = multer({ storage: storage }) ;

// insert an user into db route
router.post('/add', upload.single('image'), async (req, res) => {
  try {
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          image: req.file.filename
      });

      await user.save();
      
      // Set session message , error and redirect
      req.session.message = {
          type: 'success',
          message: 'User added successfully'
      };
      return res.redirect("/");
  } catch (err) {
      return res.json({ message: err.message, type: 'danger' });
  }
});

      
      
      
// route path


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { title : 'Home Page', users: users}); 
        } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
    }
});

router.get('/add', (req,res)=> {
    res.render("add_users", {title:"Add Users"});
});

router.get('/contact', (req,res)=> {
    res.render("contact", {title:"Contact"});
});

router.get('/about', (req,res)=> {
    res.render("about", {title:"About"});
});

// Edit a user route
router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        
        if (!user) {
            return res.redirect('/');
        }
        res.render('edit_users', {
            title: 'Edit User',
            user: user
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Update user route
router.post('/update/:id', upload.single('image'), async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = req.body.old_image;

        // Check if a new file was uploaded
        if (req.file) {
            new_image = req.file.filename;

            // Remove the old image from the server
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log("Error deleting old image: ", err);
            }
        }

        // Update user data in the database
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
        });

        // Set success message and redirect
        req.session.message = {
            type: 'success',
            message: 'User updated successfully'
        };
        res.redirect('/');
    } catch (err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

//Delete Users

router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        // If user has an associated image, attempt to delete it
        if (user && user.image) {
            try {
                fs.unlinkSync('./uploads/' + user.image);
            } catch (err) {
                console.error("Error deleting image: ", err);
            }
        }

        // Set session message and redirect on successful deletion
        req.session.message = {
            type: "success",
            message: "User deleted successfully"
        };
        res.redirect('/');
    } catch (err) {
        console.error("Error deleting user: ", err);
        res.status(500).json({ message: err.message });
    }
});





module.exports = router;