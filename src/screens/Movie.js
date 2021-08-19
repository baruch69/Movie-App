import React from 'react'
import { View, Text } from 'react-native'

export default function Movie({route}) {
    const {id} = route.params
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}
