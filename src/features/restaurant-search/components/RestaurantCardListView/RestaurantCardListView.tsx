import { ScrollView } from "react-native";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantSummary } from "@models";
import { Text } from 'react-native';
import { useEffect } from "react";
import { AppDispatch } from "@redux";
import { useDispatch } from "react-redux";
import { getRestaurantSummaryList, RestaurantSummaryListState, selectRestaurantSummaryList } from "../../redux";



const RestaurantCardListView: React.FC<{
    location?: string,
    limit?: number,
    offset?: number
}> = ({
    location = 'Brazil',
    limit = 10,
    offset = 0
}) => {
        const dispatch: AppDispatch = useDispatch();
        const { loading, data, error }: RestaurantSummaryListState = selectRestaurantSummaryList();

        useEffect(() => {
            dispatch(getRestaurantSummaryList({ location: location, limit: limit, offset: offset }));
        }, [dispatch]);

        if (loading) return <Text>Loading...</Text>;
        if (error) return <Text>Error: {error}</Text>;

        return (
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                {data.map((restaurantSummary: RestaurantSummary) => (
                    <RestaurantCard key={restaurantSummary.id} restaurant={restaurantSummary} />
                ))}
            </ScrollView>

        );
    };

export default RestaurantCardListView;