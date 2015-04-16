import express = require('express');
import userRepository = require('../../models/UserRepository');

module.exports = (() => {
    'use strict';
    var api = new express.Router();

    api.get('/',(req: express.Request, res: express.Response) => {

        new userRepository().getAll().then(users => {
            res.send(users);
        });
    });

    api.get('/:id',(req: express.Request, res: express.Response) => {

        new userRepository().getById(req.params.id).then(users => {
            res.send(users);
        });
    });

    api.post('/', (req: express.Request, res: express.Response) => {
        var firstname: string = req.body.firstname;
        var surname: string = req.body.surname;
        var email: string = req.body.email;

        new userRepository().add(firstname, surname, email)
            .then(() => res.send(200))
            .fail(() => res.send(500));
    });

    api.put('/', (req: express.Request, res: express.Response) => {
        var id: number = req.body.id;
        var firstname: string = req.body.firstname;
        var surname: string = req.body.surname;
        var email: string = req.body.email;

        new userRepository().update(id, firstname, surname, email)
            .then(() => res.send(200))
            .fail(() => res.send(500));
    });

    //(<any>api).delete('/:did', (req: express.Request, res: express.Response) => {

    //    new userRepository().getById(req.params.id)
    //        .then(() => res.send(200))
    //        .fail(() => res.send(500));
    //});

    return api;
})();
