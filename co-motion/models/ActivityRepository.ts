/// <reference path="../Scripts/typings/q/Q.d.ts" />

import sqlite = require('sqlite3');
var q = require('Q');

class ActivityRepository {
    db: sqlite.Database;

    constructor() {
        sqlite.verbose();
        this.db = new sqlite.Database('co-motion.db');
    }

    getCompanyMonthTotals(date: Date) {
        var deferred: Q.Deferred<any> = q.defer();

        // Fudge for now
        var dateMatch = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '%';

        this.db.all("SELECT SUM(Steps) AS sum FROM Activity WHERE DateTime LIKE '" + dateMatch + "'",(error, rows) => {
            if (error === null) {
                deferred.resolve(rows);
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    getCompanyDayTotals(date: Date) {
        var deferred: Q.Deferred<any> = q.defer();

        // Fudge for now
        var dateMatch = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '%';

        this.db.all("SELECT DateTime, SUM(Steps) as sum FROM Activity WHERE DateTime LIKE '" + dateMatch + "' GROUP BY DateTime ORDER BY DateTime ASC",(error, rows) => {
            if (error === null) {

                // mould data into 2 axis of data.
                var days = [];
                var steps = [];
                for (var i = 0; i < rows.length; i++) {

                    var current = rows[i];
                    var dt = current.DateTime;
                    var s = current.sum;
                    days.push(dt.substring(0, dt.length - 9));
                    steps.push(s);
                }

                deferred.resolve({days:days, steps:steps});
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }


    getUserDayTotals(date: Date) {
        var deferred: Q.Deferred<any> = q.defer();

        // Fudge for now
        var dateMatch = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + (date.getDate()) + ' 00:00:00';

        this.db.all("SELECT User.Id, User.Firstname, User.Surname, Activity.Steps as steps, Activity.Distance as distance FROM Activity \
                     JOIN User ON Activity.UserId = User.Id \
                     WHERE DateTime = '" + dateMatch + "' \
                     GROUP BY User.Firstname, User.Surname \
                     ORDER BY Activity.Steps DESC;",(error, rows) => {
            if (error === null) {
                deferred.resolve(rows);
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    getUserMonthTotals(date: Date) {
        var deferred: Q.Deferred<any> = q.defer();

        // Fudge for now
        var dateMatch = '' + date.getFullYear() + '-0' + (date.getMonth() + 1) + '%';

        this.db.all("SELECT User.Id, User.Firstname, User.Surname, SUM(Activity.Steps) as steps, SUM(Activity.Distance) as distance FROM Activity \
                    JOIN User ON Activity.UserId = User.Id \
                    WHERE DateTime LIKE '" + dateMatch + "' \
                    GROUP BY User.Id, User.Firstname, User.Surname \
                    ORDER BY steps DESC LIMIT 5;",(error, rows) => {
                if (error === null) {
                    deferred.resolve(rows);
                } else {
                    deferred.reject(error);
                }
            });

        return deferred.promise;
    }
}

export = ActivityRepository;