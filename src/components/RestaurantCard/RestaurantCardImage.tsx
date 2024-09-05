import React from 'react';
import { StyleSheet, Image } from 'react-native';

// Extending FC to include sharedElements
interface RestaurantCardImageProps {
    uri: string;
}

const RestaurantCardImage: React.FC<RestaurantCardImageProps> = ({ uri }) => {



    return (
        <Image
            source={{ uri: uri }}

            style={styles.image}
        />

    );
}


export default RestaurantCardImage;

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
});