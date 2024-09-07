import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

interface RatingBarProps { rating: number | null };

const RatingBar: React.FC<RatingBarProps> = ({ rating }) => <View style={styles.ratingContainer}>
    {Array.from({ length: rating || 0 }, (_, i) => (
        <StarIcon key={i} />
    ))}
</View>

const StarIcon = () => <FontAwesome name="star" size={16} color="gold" />;

export default RatingBar;

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
});