import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RestaurantId, RestaurantSummarySerializable } from '@models';
import Row from '../Row';
import RestaurantCardImage from './RestaurantCardImage';
import { RestaurantCardInfoView } from './RestaurantCardInfoView';
import { AppNavigationParams } from '@navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RestaurantDetailsNavigationProp = StackNavigationProp<AppNavigationParams, 'RestaurantDetails'>;

const useNavigateToRestaurantDetails = () => {
    const navigation = useNavigation<RestaurantDetailsNavigationProp>();

    return ({ restaurantId, restaurantImageUrl }: { restaurantId: RestaurantId, restaurantImageUrl?: string }) =>
        navigation.navigate('RestaurantDetails', { restaurantId: restaurantId, restaurantImageUrl: restaurantImageUrl });
};

const RestaurantCard: React.FC<{ restaurant: RestaurantSummarySerializable }> = ({ restaurant }) => {
    const goToRestaurantDetails = useNavigateToRestaurantDetails();

    const photos = restaurant.photos;
    const restaurantImageUrl = (photos.length > 0) ? photos[0] : null;


    const onPress = () => {
        goToRestaurantDetails({ restaurantId: restaurant.id, restaurantImageUrl: restaurantImageUrl ?? undefined });
    };

    return (
        <TouchableOpacity onPress={onPress} >
            <Row style={styles.card} testID={`restaurantCard-${restaurant.id}`}>

                {restaurantImageUrl && <RestaurantCardImage uri={restaurantImageUrl} />}
                <RestaurantCardInfoView
                    name={restaurant.name}
                    price={restaurant.price}
                    isOpenNow={restaurant.isOpenNow}
                    rating={restaurant.rating}
                    categories={restaurant.categories}
                />
            </Row>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 1, height: 1 }, // for iOS
        shadowOpacity: 0.1, // for iOS
        shadowRadius: 5, // for iOS
        marginVertical: 10,
        alignItems: 'center',
    },
});

export default RestaurantCard;
