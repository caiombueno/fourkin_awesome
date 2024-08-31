import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantSummary } from "@models";
import { Text } from 'react-native';
import { useEffect } from "react";
import { AppDispatch } from "@redux";
import { useDispatch } from "react-redux";
import { getRestaurantSummaryList, RestaurantSummaryListState, selectRestaurantSummaryList } from "../../redux";

const RestaurantCardListView: React.FC<{
    location: string,
    limit?: number,
    offset?: number,
    style?: StyleProp<ViewStyle>
}> = ({
    location,
    limit = 10,
    offset = 0,
    style
}) => {
        const dispatch: AppDispatch = useDispatch();
        const { loading, data, error }: RestaurantSummaryListState = selectRestaurantSummaryList();

        useEffect(() => {
            dispatch(getRestaurantSummaryList({ location: location, limit: limit, offset: offset }));
        }, [dispatch]);

        if (loading) return <LoadingIndicator />;
        if (error) return <ErrorIndicator error={error} />

        return (

            <View style={style}>
                {data.map((restaurantSummary: RestaurantSummary) => (
                    <RestaurantCard key={restaurantSummary.id} restaurant={restaurantSummary} />
                ))}
            </View>

        );
    };


const LoadingIndicator: React.FC = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Loading restaurants...</Text>
    </View>
);

const ErrorIndicator: React.FC<{ error: string, }> = ({ error, }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', marginBottom: 10 }}>Something went wrong:</Text>
        <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
    </View>
);


export default RestaurantCardListView;