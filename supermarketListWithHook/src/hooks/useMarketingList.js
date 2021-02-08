import React, {useReducer} from 'react'
import { sha256 } from 'react-native-sha256'
import {  
   Alert
  } from 'react-native';
  

const useMarketingList = () => {

    const initialState = {
        products: []
    }

    const[state, dispatch] = useReducer(reducer,initialState)



    const reducer = (state, action) => {

        switch(action.type){
            case 'ADD':
                return {
                    ...state,
                    products: [...state.products, action.item]
                }
            case 'REMOVE':
                return {
                    ...state,
                    products : state.products.filter(item => {
                        return item.id !== action.id
                    })
                }
            case 'CHECK':
                if( action.id === undefined){
                    Alert.alert('Item Null')
                }
                else{
                    return {
                        ...state,
                        products : state.products.map(item => {
                            if(item.id === action.id){
                                return {
                                    ...item, check: !item.check
                                }    
                            }
                            else{
                                return item
                            }
                        })
                    }
                }
            default:  
                return state  
        }
    }

    

    const addItem = async textItem => {
        const hashId = await sha256(textItem);
        dispatch({type: 'ADD', item: {
            id: hashId, 
            title:textItem,
            check: false
        }})
    }

    const checkItem = (id) => {
        dispatch({
            type: 'CHECK', 
            id: id
        })
    }

    const removeItem = (id) => {
        dispatch({
            type: 'REMOVE', 
            id: id
        })
    }


    return [state, addItem, checkItem, removeItem]
}


export default useMarketingList