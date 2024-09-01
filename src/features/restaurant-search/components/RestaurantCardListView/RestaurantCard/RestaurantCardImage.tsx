import { Image, StyleSheet } from 'react-native';

const RestaurantCardImage: React.FC<{ uri: string }> = ({ uri }) => <Image
    source={{ uri: uri }}
    style={styles.image}
/>

export default RestaurantCardImage;

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
});