import { StyleSheet, Text } from 'react-native';

const RestaurantNameText: React.FC<{ name: string | null }> = ({ name }) =>
    <Text style={styles.title} numberOfLines={2}>
        {name || 'Unknown Restaurant'}
    </Text>

export default RestaurantNameText;

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});