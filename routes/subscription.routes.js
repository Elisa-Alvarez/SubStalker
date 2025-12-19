import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => res.send({title:'All subscribers'}));

subscriptionRouter.get('/:id', (req,res) => res.send({title: 'Subscriber by id'}));

subscriptionRouter.delete('/:id', (req,res) => res.send({title: 'Delete subscriber'}));

subscriptionRouter.post('/', (req,res) => res.send({title: 'Create subscriber'}));

subscriptionRouter.put('/:id', (req,res) => res.send({title: 'Update subscriber'}));

subscriptionRouter.get('/user/:id', (req,res) => res.send({title: 'Get user subscription'}));

subscriptionRouter.put('/:id/cancel', (req,res) => res.send({title: 'Cancel subscription'}));

subscriptionRouter.get('/upcomming-renewals', (req,res) => res.send({title: 'Upcomming renewals'}));

export default subscriptionRouter