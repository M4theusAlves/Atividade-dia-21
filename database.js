import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseAsync('participantes.db', undefined, 
  () => console.log('Banco de dados aberto com sucesso'),
  (error) => console.error('Erro ao abrir banco de dados:', error)
);


export const criarTabela = () => {
  db.criarTabela((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS participantes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);',
      [],
      () => console.log('Tabela criada com sucesso'),
      (error) => console.log('Erro ao criar tabela:', error)
    );
  });
};

export const adicionarParticipante = (nome, sucessoCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO participantes (nome) VALUES (?);',
      [nome],
      (_, result) => sucessoCallback(result),
      (error) => console.log('Erro ao adicionar participante:', error)
    );
  });
};

export const listarParticipantes = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM participantes;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (error) => console.log('Erro ao listar participantes:', error)
    );
  });
};

export const removerParticipante = (id, sucessoCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM participantes WHERE id = ?;',
      [id],
      (_, result) => sucessoCallback(result),
      (error) => console.log('Erro ao remover participante:', error)
    );
  });
};

export default db;
