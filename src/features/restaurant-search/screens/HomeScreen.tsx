import React, { useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { RestaurantSummary } from '@models';
import { getRestaurantSummaryList, RestaurantSummaryListState, selectRestaurantSummaryList } from '../redux';
import { AppDispatch } from '@redux';


const RestaurantsList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, data, error }: RestaurantSummaryListState = selectRestaurantSummaryList();

    useEffect(() => {
        dispatch(getRestaurantSummaryList({ location: 'San Francisco', limit: 10, offset: 0 }));
    }, [dispatch]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View>
            {data.map((restaurantSummary: RestaurantSummary) => (
                <View key={restaurantSummary.id}>
                    <Text>{restaurantSummary.name}</Text>
                    <Text>{restaurantSummary.rating}</Text>
                </View>
            ))}
        </View>
    );
};

const HomeScreen: React.FC = () => {
    return (
        <SafeAreaView>
            <Text>Home Screen</Text>
            <RestaurantsList />
        </SafeAreaView>
    );
};

export default HomeScreen;
