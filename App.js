import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [pessoa, setPessoa] = useState('');
  const [listaPessoas, setListaPessoas] = useState([]);

  const adicionarPessoa = () => {
    if (pessoa.trim() !== '') {
      setListaPessoas([...listaPessoas, pessoa]);
      setPessoa('');
    }
  };

  const removerPessoa = (index) => {
    const novaLista = listaPessoas.filter((_, i) => i !== index);
    setListaPessoas(novaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Lista de Pessoas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da pessoa"
        value={pessoa}
        onChangeText={setPessoa}
      />

      <Button title="Adicionar Pessoa" onPress={adicionarPessoa} />

      <FlatList
        data={listaPessoas}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removerPessoa(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
});
