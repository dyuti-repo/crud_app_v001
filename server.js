const express = require('express');
const app = express();
const port = 3005;
//const dbfunctions = require('./models/dboperations.js');
const dbfunctions = require('./config/db.js');


 app.get("/",(req,res)=>{
     res.send('api is running');
 });

async function servermain(){

   let connection3;

    try{
        //const asyncdata = await dbfunctions.dboperate();
        await dbfunctions.initOracleClient();
        connection3 = await dbfunctions.getConnection();
        await dbfunctions.checkExisting(connection3);
        await dbfunctions.fetchdata(connection3);
        
    }catch(dboperate_error){
        console.error('error in servermain function',dboperate_error);
    }finally {
        if (connection3) {
          try {
            //close the connection
            await connection3.close();
            console.log("Connection Closed");
          } catch (close_error) {
            console.error("Error in closing the connection", close_error);
          }
        }
      }
} 

app.listen(port);
console.log('Server is running on port no: ' + 3005);

console.log('calling main function...');
servermain();
