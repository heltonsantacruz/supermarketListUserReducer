import React, {useState, useReducer} from 'react';
import {  
  View,
  Text,  
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList, Alert
} from 'react-native';
import Colors from './styles/Colors';

import { sha256 } from 'react-native-sha256'


const Main = () => {

    //const initialState = []
    const initialState = {
        products: []
    }

    const reducer = (state, action) => {

        switch(action.type){
            case 'ADD':
                
                return {
                    ...state,
                    products: [...state.products, action.item]
                }

               // return [...state, action.item]
            case 'REMOVE':
                return    
            case 'CHECK':
                if( action.item.id === undefined){
                    Alert.alert('Item Null')
                }
                else{
                    return {
                        ...state,
                        products : state.products.map(item => {
                            if(item.id === action.item.id){
                                return {
                                    ...item, check: !item.check
                                }    
                            }
                            else{
                                return item
                            }
                        })
                    }


/*                    return state.products.map( item => {
                        if(item.id === action.item.id){
                            return {
                                ...item, check: !item.check
                            }    
                        }
                        else{
                            return item
                        }
                    })       */
                }
            default:  
                return state  
        }
    }

    const[textoItem, setTextoItem] = useState('');        
    const[state, dispatch] = useReducer(reducer,initialState)


/*   const data = [
       {id: '1', title: 'Rice', check: false},
       {id: '2', title: 'Flour', check: false},
   ]  
*/

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
                    const hashId = await sha256(textoItem);
                    dispatch({type: 'ADD', item: {
                        id: hashId, 
                        title:textoItem,
                        check: false
                    }})
                    setTextoItem('')
                }}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
        <FlatList  
            //keyExtractor={item => item.id}  
            data={state.products}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress= { () => {
                            dispatch({
                                type: 'CHECK', 
                                item: item
                                //id: item.id
                            })
                        }}>
                        <Text style={[styles.listItem, item.check ? styles.listItemChecked : '']}>{item.title}</Text>
                </TouchableOpacity>
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
    } 


})

export default Main;
