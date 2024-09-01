import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RestaurantSummary } from '@models';
import { Row } from '@components';
import RestaurantCardImage from './RestaurantCardImage';
import { RestaurantCardInfoView } from './RestaurantCardInfoView';
import { RootStackParamList } from '@navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';



type RestaurantDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantDetails'>;

const useNavigateToRestaurantDetails = () => {
    const navigation = useNavigation<RestaurantDetailsNavigationProp>();

    return () =>
        navigation.navigate('RestaurantDetails');

};

const RestaurantCard: React.FC<{ restaurant: RestaurantSummary }> = ({ restaurant }) => {
    const navigateToRestaurantDetails = useNavigateToRestaurantDetails;

    return (
        <TouchableOpacity onPress={navigateToRestaurantDetails()}>
            <Row style={styles.card}>
                <RestaurantCardImage uri={restaurant.photos[0]} />
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
