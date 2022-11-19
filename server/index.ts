import dotenv from "dotenv";
import app from "./app";
import http from "http";

dotenv.config();

async function main()
{
    const port = process.env.SERVER_PORT || 5000; //ako se slucajno izbrise .env fajl; dobra praksa
    const server = http.createServer(app); //ako budemo sa socket-om radili.

    server.listen(port, () => {  //callback f-ja
        console.log(`Server started at ${port}...`);
    })
}

main();
//index.ts glavni konfiguracioni fajl