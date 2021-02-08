import React, {useState} from 'react';
import {  
  View,
  Text,  
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Colors from './styles/Colors';



import useMarketingList from './src/hooks/useMarketingList'



const Main = () => {

    const[textoItem, setTextoItem] = useState('');        
    
    const[state, addItem, checkItem, removeItem] = useMarketingList()


  return (
      
    <View style={styles.container}>
        <View style={styles.inputContainer}> 


            <TextInput 
                style={styles.input} 
                placeholder="Add product"
                value={textoItem}
                onChangeText={text => {
                    setTextoItem(text)
                }}
            />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={ async ()  =>  {
                    addItem(textoItem)
                    setTextoItem('')
                }}
                
                >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
        <FlatList  
            //keyExtractor={item => item.id}  
            data={state.products}
            renderItem={({item}) => (
                    <View style={styles.itemsContainer}>
                        <TouchableOpacity 
                        style={styles.itemCheckButton}
                        onPress= { () => {
                            checkItem(item.id)
                            }}>
                            <Text style={[styles.listItem, item.check ? styles.listItemChecked : '']}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.removeItem}
                            onPress={ () => {
                                removeItem(item.id)
                            }}>
                            <Text style={styles.removeItemText}>Remove</Text>
                        </TouchableOpacity>
                    </View>    
            )}
        />
        <View>

        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: Colors.white
    },
    inputContainer: {
        flexDirection: "row",
        margin: 10
    },
    input: {
        flex: 1,
        fontSize: 30,
        color: Colors.black
    },
    addButton: {
        marginHorizontal: 5,        
        alignItems: 'center',
        alignSelf: 'center'

    },
    addButtonText: {
        color: Colors.darkRed,
        fontSize: 60,
    },
    listItem: {        
        backgroundColor: Colors.darkGray,
        fontSize: 22,
        marginVertical: 3,
        marginHorizontal: 7,
        padding: 5
    },
    listItemChecked: {        
        textDecorationLine: 'line-through'
    } ,
    itemsContainer: {        
        flexDirection: 'row'
    },
    removeItem: {
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10
    },
    itemCheckButton: {
        flex: 4
    },
    removeItemText: {
        fontSize: 12,
        color: Colors.darkRed

    }



})

export default Main;
