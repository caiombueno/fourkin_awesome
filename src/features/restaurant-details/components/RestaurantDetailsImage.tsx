import { StyleSheet } from "react-native"
import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export const RestaurantDetailsImage = ({ restaurantImageUrl }: { restaurantImageUrl: string }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    useEffect(() => {
        scale.value = withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.exp),
        });
        opacity.value = withDelay(200, withTiming(1, { duration: 400 }));
        translateY.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.exp),
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }, { translateY: translateY.value }],
            opacity: opacity.value,
        };
    });


    return <Animated.Image
        source={{ uri: restaurantImageUrl }} style={[styles.image, animatedStyle]} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
    }
});