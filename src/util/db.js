import {} from 'dotenv/config';
import { MongoClient } from 'mongodb';
import MongoUriBuilder from 'mongo-uri-builder';


let mongoCons = {};
//Extracted all database values from enviornment variables.
let {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB_NAME,
    MONGO_USERNAME,
    MONGO_PASSWORD,
} = process.env;

if(!MONGO_HOST){
    console.error("app:agds:db.js",`FATAL ERROR: MONGO_HOST is not defined.`);
    process.exit(1);
}
if(!MONGO_PORT){
    console.error("app:agds:db.js",`FATAL ERROR: MONGO_PORT is not defined.`);
    process.exit(1);
}
if(!MONGO_DB_NAME){
    console.error("app:agds:db.js",`FATAL ERROR: MONGO_AGDS_DB is not defined.`);
    process.exit(1);
}

//MongoDb variables.
let mongoConnectionSettings = {
    host: MONGO_HOST,
    port: MONGO_PORT,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
}

const mongoConnect = ()=>{
    return new Promise((resolve,reject)=>{
        //If connection persists
        if(typeof mongoCons[MONGO_DB_NAME] !== "undefined"){
            resolve(mongoCons[MONGO_DB_NAME]);
            return;
        }

        MongoClient.connect(
            MongoUriBuilder({
                ...mongoConnectionSettings,
                database: MONGO_DB_NAME
            }),
            { useNewUrlParser: true }, // to supress deprecation warning
            (err, newDbConnection) => {
                if (err) {
                    console.error("app:agds:db.js",`FATAL ERROR: Error in mongodb connection`)
                    reject(`Error in mongodb connection`,err);
                    return;
                }
                // save connection for later
                mongoCons[MONGO_DB_NAME] = newDbConnection.db(MONGO_DB_NAME);
                resolve(mongoCons[MONGO_DB_NAME]);
            }
        )
    })
}

export {mongoConnect};