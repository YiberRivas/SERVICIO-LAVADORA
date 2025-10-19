import pool from '../config/db.js';

export const getLavadoras = async () => {
  const [rows] = await pool.query('SELECT * FROM lavadora');
  return rows;
};

export const getLavadora = async (id) => {
  const [rows] = await pool.query('SELECT * FROM lavadora WHERE id_lavadora = ?', [id]);
  return rows[0];
};

export const createLavadora = async (data) => {
  const { marca, modelo, capacidad, estado } = data;
  const [result] = await pool.query(
    'INSERT INTO lavadora (marca, modelo, capacidad, estado) VALUES (?, ?, ?, ?)',
    [marca, modelo, capacidad, estado]
  );
  return { id_lavadora: result.insertId, ...data };
};
