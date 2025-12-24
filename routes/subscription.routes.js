import { Router } from "express";
import { createSubscription, getUserSubs } from "../controller/subcription.controller.js";
import authorize from '../middleware/auth.middleware.js'

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => res.send({title:'All subscribers'}));

subscriptionRouter.get('/:id', (req,res) => res.send({title: 'Subscriber by id'}));

subscriptionRouter.delete('/:id', (req,res) => res.send({title: 'Delete subscriber'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req,res) => res.send({title: 'Update subscriber'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubs);

subscriptionRouter.put('/:id/cancel', (req,res) => res.send({title: 'Cancel subscription'}));

subscriptionRouter.get('/upcomming-renewals', (req,res) => res.send({title: 'Upcomming renewals'}));

export default subscriptionRouter