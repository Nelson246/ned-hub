const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

async function createAdmin() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const name = "NED HUB Admin";
        const email = "admin@nedhub.com";
        const password = "ChangeMe123!";
        const role = "admin";

        const hashedPassword = await bcrypt.hash(password, 12);

        await connection.execute(
            `
            INSERT INTO admins
            (name, email, password, role)
            VALUES (?, ?, ?, ?)
            `,
            [
                name,
                email,
                hashedPassword,
                role
            ]
        );

        console.log("");
        console.log("================================");
        console.log("ADMIN ACCOUNT CREATED");
        console.log("================================");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Role:", role);
        console.log("================================");
        console.log("");

    } catch (error) {
        console.error("Failed to create admin:", error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

createAdmin();