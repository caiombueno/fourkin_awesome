import { ActivityIndicator, FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { RestaurantCard } from "@components";
import { Text } from 'react-native';
import { useEffect } from "react";
import { AppDispatch } from "@redux";
import { useDispatch } from "react-redux";
import { getRestaurantSummaryList, resetRestaurantSummaryList, selectRestaurantSummaryList } from "../../redux";

const RestaurantCardListView: React.FC<{
    location: string;
    limit?: number;
    style?: StyleProp<ViewStyle>;
}> = ({ location, limit = 10, style, }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, data, error, offset, hasMore } = selectRestaurantSummaryList();

    useEffect(() => {
        dispatch(getRestaurantSummaryList({ location, limit, offset: 0 }));

        return () => { dispatch(resetRestaurantSummaryList()) };
    }, [dispatch, location, limit]);

    const loadMoreRestaurants = () => {
        if (hasMore && !loading) {
            dispatch(getRestaurantSummaryList({ location, limit, offset: offset + limit }));
        }
    };

    if (loading && data.length === 0) {
        return <LoadingIndicator />;
    }

    if (error && data.length === 0) {
        return <ErrorIndicator error={error} />;
    }

    return (

        <FlatList
            testID="RestaurantCardListView.FlatList"
            contentContainerStyle={style}
            scrollEnabled={true}
            data={data}
            renderItem={({ item }) => (
                <RestaurantCard key={item.id} restaurant={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading && hasMore ? <LoadingIndicator /> : (error ? <ErrorIndicator error={error} /> : null)}
        />

    );
};

const LoadingIndicator: React.FC = () => (
    <View testID="RestaurantCardListView.LoadingIndicator" style={styles.loadingIndicatorView}>
        <ActivityIndicator />
        <Text>Loading restaurants...</Text>
    </View>
);

const ErrorIndicator: React.FC<{ error: string, }> = ({ error, }) => (
    <View testID="RestaurantCardListView.ErrorIndicator" style={styles.errorIndicatorView}>
        <Text style={styles.errorText}>Something went wrong:</Text>
        <Text style={styles.errorDescriptionText}>{error}</Text>
    </View>
);

const styles = StyleSheet.create({
    loadingIndicatorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIndicatorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    errorDescriptionText: {
        color: 'red',
        marginBottom: 20,
    },
});


export default RestaurantCardListView;