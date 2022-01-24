import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';


export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      // .where('quantity', '==', 4) // Filtro
      // .limit(2) // Limitador
      // .orderBy('quantity') // Ordenação
      // .startAt(2) //Intervalo
      // .endAt(4) //Intervalo
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[]

        setProducts(data)
      })


    return () => subscribe()
  }, [])

  // Leitura única de um documento
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('OLVdY3u87hQyt4nKLRyM')
  //     .get()
  //     .then(response => {
  //       console.log({
  //         id: response.id,
  //         ...response.data()
  //       })
  //     })
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
