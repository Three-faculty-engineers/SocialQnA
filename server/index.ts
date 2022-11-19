import dotenv from "dotenv";
import app from "./app";
import http from "http";

dotenv.config();

async function main()
{
    const port = process.env.SERVER_PORT || 5000;
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server started at ${port}...`);
    })
}

main();