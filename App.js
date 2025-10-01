import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, Button} from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App(){
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () =>{
    if(task.length>0){
      setTasks([...tasks,{key: Math.random().toString(), status:0, value:task}]);
      setTask('');
    }
  }

  const toggleStatus = (key) => {
    setTasks(tasks.map(item=>
      item.key === key ? {...item,status: item.status === 0 ? 1 : 0} : item
    ));
  }

  const removeTask = (key) => {
    setTasks(tasks.filter(item=>item.key !== key));
  }

  return(
    <View style={style.app}>
      <View style={style.input_area}>
        <Text style={style.title}>LISTA DE TAREFAS</Text>
        <TextInput style={style.input} placeholder='Digite a tarefa desejada' onChangeText={setTask} value={task}></TextInput>
        <Pressable style={style.btn}>
          <Text onPress={addTask} style={style.btn_label}>Adicionar</Text>
        </Pressable>
      </View>
      <FlatList
        style={style.list}
        data={tasks}
        renderItem={({item})=>(
          <View style={style.task_card}>
            <Pressable onPress={() => toggleStatus(item.key)}>
              {item.status==0 && <Fontisto name="checkbox-passive" size={35} color="black" />}
              {item.status==1 && <Fontisto name="checkbox-active" size={35} color="black" />}
            </Pressable>
            <Text style={[style.task_title,item.status === 1 && { textDecorationLine: 'line-through', color: '#000' }]}>{item.value}</Text>
            <Pressable onPress={() => removeTask(item.key)}>
              {item.status==1 && <FontAwesome name="trash-o" size={35} color="black" />}
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

const style = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor: '#c4c4c4',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input_area:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
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
    height: 40,
    width: 300,
    textAlign: 'center',
    margin: 5,
    backgroundColor: '#fff',
    fontSize: 20,
  },
  btn:{
    width: 200,
    height: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btn_label:{
    fontSize: 20
  },
  task_card:{
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  task_title:{
    marginLeft: 10,
    fontSize: 30
  },
})