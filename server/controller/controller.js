const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    surname : {
        type: String,
        required: true,
        unique: true
    }
    
})


const Userdb = mongoose.model('database', schema);

// create 
exports.create = (req,res)=>{
    
    

    // new user
    const user = new Userdb({
        name : req.body.name,
        surname : req.body.surname
        
    })

    

    user
        .save(user)
        .then(data => {
            
            res.redirect('/add-user');
        })
        .catch(err =>{
            console.log(err);
        });

}

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                    res.send(data)
                
            })
            .catch(err =>{
                res.send({ message:err.mesage})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.send({ message : err.message})
            })
    }

    
}

// Update 
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Updated data can't be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.send({ message : `Cannot Update`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.send({ message : err.message})
        })
}

// Delete
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : err.message})
            }else{
                res.send({
                    message : "deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message
            });
        });
}
