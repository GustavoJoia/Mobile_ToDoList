import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native'

export default function App(){
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () =>{
    setTasks([...tasks,{key: Math.random().toString(), value:task}]);
    setTask('');
  }

  return(
    <View style={style.app}>
      <Text style={style.title}>Lista de Tarefas</Text>
      <TextInput style={style.input} placeholder='Adicionar nova tarefa...'
        onChangeText={setTask}
        value={task}
      />
      <Button title="Adicionar" onPress={addTask}></Button>
      <FlatList
        data={tasks}
        renderItem={({item})=>(
          <Text>{item.value}</Text>
        )}
      />
    </View>
  )
}

const style = StyleSheet.create({
  app:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c4c4c4',
  },
  title:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
  },
  input:{
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    width: 300,
    textAlign: 'center',
    margin: 5
  },
})