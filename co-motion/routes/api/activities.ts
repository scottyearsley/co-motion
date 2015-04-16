import express = require('express');
import activityRepository = require('../../models/ActivityRepository');

module.exports = (() => {
    'use strict';
    var api = new express.Router();

    api.get('/CompanyMonthTotals',(req: express.Request, res: express.Response) => {

        var date: Date = new Date();
        var monthTotal;
        var repos = new activityRepository();

        repos.getCompanyMonthTotals(date).then(total => {
            monthTotal = total[0].sum;
            return repos.getCompanyDayTotals(date);

        }).then(dayTotals => {
            var totals = {
                total: monthTotal,
                days: dayTotals
            };
            res.send(totals);
        });
    });

    api.get('/UserDayTotals',(req: express.Request, res: express.Response) => {

        var date: Date = new Date();
        var repos = new activityRepository();

        repos.getUserDayTotals(date).then(totals => {
            return res.send(totals);
        });
    });

    api.get('/UserMonthTotals',(req: express.Request, res: express.Response) => {

        var date: Date = new Date();
        var repos = new activityRepository();

        repos.getUserMonthTotals(date).then(totals => {
            return res.send(totals);
        });
    });

    return api;
})();