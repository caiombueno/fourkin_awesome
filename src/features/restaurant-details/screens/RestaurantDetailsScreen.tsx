import { Text, ScrollView, View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { RestaurantId } from '@models';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux';
import { getRestaurantDetails, selectRestaurantDetails } from '../redux';
import { RestaurantDetailsImage, RestaurantDetailsView } from '../components';
import { RouteProp } from '@react-navigation/native';
import { AppNavigationParams } from '@navigation';

const { width, height } = Dimensions.get('window');

type RestaurantDetailsScreenProps = {
    route: RouteProp<AppNavigationParams, 'RestaurantDetails'>;
};

const RestaurantDetailsScreen: React.FC<RestaurantDetailsScreenProps> = (
    { route }
) => {
    const { restaurantId, restaurantImageUrl } = route.params;
    const { loading, data, error } = selectRestaurantDetails();
    const dispatch: AppDispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRestaurantDetails({ id: restaurantId }));
    }, [restaurantId]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {restaurantImageUrl && <RestaurantDetailsImage restaurantImageUrl={restaurantImageUrl} />}
            {loading && <LoadingIndicator />}
            {error && <ErrorIndicator message={error.message} />}
            {data && <RestaurantDetailsView
                price={data.price}
                rating={data.rating}
                categories={data.categories}
                isOpenNow={data.isOpenNow}
                reviews={data.reviews}
                address={data.address} />}
        </ScrollView>
    );
};

const ErrorIndicator: React.FC<{ message: string }> = ({ message }) => {
    return (
        <View testID='RestaurantDetailsScreen.ErrorIndicator' style={styles.centeredContainer}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

const LoadingIndicator: React.FC = () => {
    return (
        <View testID='RestaurantDetailsScreen.LoadingIndicator' style={styles.centeredContainer}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: width * 0.04, // 4% of screen width
        textAlign: 'center',
        marginTop: height * 0.02, // 2% of screen height
    },
});

export { RestaurantDetailsScreen, RestaurantDetailsScreenProps };
