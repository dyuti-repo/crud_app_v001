const oracledb = require("oracledb");

async function initOracleClient() {
  try {
    await oracledb.initOracleClient({
      libDir: "C:\\ORACLE\\instantclient_21_13",
    });
    console.log("Oracle Instant Client initialized successfully");
  } catch (err) {
    console.error("Error initializing Oracle Instant Client:", err);
  }
}

async function getConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "TRNG_1",
      password: "TRNG1234",
      connectString:
        "(DESCRIPTION = (ADDRESS=(COMMUNITY = tcp.world)(PROTOCOL=TCP)(HOST=192.168.4.13)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=nerpdev)(SERVICE=SHARED)))",
    });
    console.log("Successfully connected to Oracle Database");
    return connection;
  } catch (get_err) {
    console.error("Error connecting to the database:", get_err);
    //
  } 
}

async function checkExisting(connection){
    
    try{
        // Construct a SELECT query to check for existing record (adapt to your table schema)
        const checkSql = `SELECT COUNT(*) FROM MASTER_NODE WHERE id = :col1`;
        const checkBinds = { col1: 1001 }; // Replace with your data

        // Execute the check query
        const checkResult = await connection.execute(checkSql, checkBinds);
        // Check if record already exists
        if (checkResult.rows[0][0] === 0) {
            // Construct your INSERT statement
            // Define the SQL insert statement
            console.log('initializing insertion process');
            const insertSql = `INSERT INTO MASTER_NODE (ID, NAME, EMAIL) VALUES (:value1, :value2, :value3)`;
            const insertBinds = {value1: 1001,value2: 'VPARYA',value3: 'vparya@gmail.com'};
        
            // Execute the INSERT statement only if record doesn't exist
            const insertResult = await connection.execute(insertSql, insertBinds, { autoCommit: true });
            console.log('Rows inserted:', insertResult.rowsAffected);
            console.log('insertion done successfully');
            console.log(`Record inserted into MASTER_NODE`);
        
        } else {
            console.log(`Record with ID ${checkBinds.col1} already exists in table MASTER_NODE`);
            // Execute a FETCH query
            console.log('Since already data exist showing existing records');
            const result = await connection.execute('SELECT * FROM MASTER_NODE');
            console.log('Query results:', result.rows);
        } 

    }catch(existRec_error){
        console.error("Error connecting to the database:", existRec_error);
    }
}

async function fetchdata(connection){
    try{
        console.log('Fetching started');
        const fetch_result = await connection.execute('SELECT * FROM MASTER_NODE');
        console.log('Query results:', fetch_result.rows);
    }catch(fetch_erorr){
        console.error("Error fetching the data from database:", fetch_erorr);
    }
}

// async function dboperate(){
//     let connection2;
//     try{
//         await initOracleClient();
//         connection2 = await getConnection();
//         await checkExisting(connection2);
//         await fetchdata(connection2);

//     }catch(dboperate_error){
//         console.error('error in dboperate function',dboperate_error);
//     }finally {
//         if (connection2) {
//           try {
//             //close the connection
//             await connection2.close();
//             console.log("Connection Closed");
//           } catch (close_error) {
//             console.error("Error in closing the connection", close_error);
//           }
//         }
//       }
// }


//   module.exports = initOracleClient(),checkExisting(),fetchdata(),dboperate();
  module.exports = initOracleClient(),checkExisting(),fetchdata();