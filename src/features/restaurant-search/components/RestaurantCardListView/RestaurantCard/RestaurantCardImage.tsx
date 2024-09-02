import { Image, StyleSheet } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

// Extending FC to include sharedElements
interface RestaurantCardImageProps {
    uri: string;
}

const RestaurantCardImage: React.FC<RestaurantCardImageProps> = ({ uri }) => {
    return (
        <SharedElement id={uri}>
            <Image
                source={{ uri: uri }}
                style={styles.image}

            />
        </SharedElement >

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