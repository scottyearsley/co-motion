/// <reference path="../Scripts/typings/q/Q.d.ts" />

import sqlite = require('sqlite3');
var q = require('Q');

class UserRepository {
    db: sqlite.Database;

    constructor() {
        sqlite.verbose();
        this.db = new sqlite.Database('co-motion.db');
    }

    getLastInsertId(): Q.Promise<number> {
        var deferred: Q.Deferred<number> = q.defer();
        this.db.get("SELECT last_insert_rowid() AS Id",(error,result) => {
            if (error === null) {
                deferred.resolve(result.Id);
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    getAll(): Q.Promise<any> {
        var deferred: Q.Deferred<any> = q.defer();

        this.db.all("SELECT * FROM User",(error, rows) => {
            if (error === null) {
                deferred.resolve(rows);
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }
    
    getById(id: number): Q.Promise<any> {
        var deferred: Q.Deferred<any> = q.defer();

        this.db.all("SELECT * FROM User WHERE Id =" + id.toString(),(error, rows) => {
            if (error === null) {
                if (rows.length > 0) {
                    deferred.resolve(rows[0]);
                } else {
                    deferred.resolve(null);
                }
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    add(firstname: string, surname: string, email: string): Q.Promise<number> {
        var deferred: Q.Deferred<number> = q.defer();

        var stmt = this.db.prepare('INSERT INTO "main"."User" ("Firstname", "Surname", "Email") VALUES (?1,?2,?3)');
        stmt.run(firstname, surname, email, (error, result) => {
            deferred.resolve(result);
            stmt.finalize();
        });
        
        return deferred.promise;
    }

    update(id: number, firstname: string, surname: string, email: string): Q.Promise<boolean> {
        var deferred: Q.Deferred<boolean> = q.defer();

        var stmt = this.db.prepare('UPDATE "main"."User" SET "Firstname" = ?1, "Surname" = ?2, "Email" = ?3 WHERE  "Id" = ?4');
        stmt.run(firstname, surname, email, id, (error, result) => {
            deferred.resolve(result);
            stmt.finalize();
        });

        return deferred.promise;
    }

    updateCode(id: number, code: string, moveId: string) {
        var stmt = this.db.prepare('UPDATE "main"."User" SET Code = ?1, MoveId = ?2 WHERE "Id" = ?3');
        stmt.run(code, moveId.toString(), id);
        stmt.finalize();
    }

    remove(id: number): Q.Promise<boolean> {
        var deferred: Q.Deferred<boolean> = q.defer();

        var stmt = this.db.prepare('DELETE "main"."User" WHERE "Id" = ?1');
        stmt.run(id,(error, result) => {
            deferred.resolve(result);
            stmt.finalize();
        });

        return deferred.promise;
    }
}

export = UserRepository;