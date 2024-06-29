import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
});

async function connectToDatabase(): Promise<void> {
    try {
        await client.connect();
        console.log('connection made successfully!');
    } catch (err) {
        console.error('connection error', err.stack);
    }
}

connectToDatabase();

export default client;
