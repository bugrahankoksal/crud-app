const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');



/**
 *  @description
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**

 *  @description 
 *  @method GET 
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


route.get('/api/users', controller.find);

module.exports = route