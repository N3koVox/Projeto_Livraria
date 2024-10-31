import pool from '../config/database';

const createTransactionTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        date_purchase VARCHAR(100) NOT NULL,
        book_id INT,
        client_id INT,
        price DECIMAL(100) UNIQUE NOT NULL
        FOREIGN KEY (book_id) REFERENCES books(id),
        FOREIGN KEY (client_id) REFERENCES clientes(id)
      );
    `;
    await client.query(queryText);
    console.log('Tabela "transaction" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  } finally {
    client.release();
  }
};

createTransactionTable().then(() => process.exit(0));