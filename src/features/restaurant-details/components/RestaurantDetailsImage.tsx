import { View, StyleSheet } from "react-native"
import React from 'react';
import { SharedImage } from "@components";

export const RestaurantDetailsImage = ({ restaurantImageUrl }: { restaurantImageUrl: string }) => {
    return <View>
        <SharedImage
            style={styles.image} url={restaurantImageUrl} />
    </View>;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
    }
});