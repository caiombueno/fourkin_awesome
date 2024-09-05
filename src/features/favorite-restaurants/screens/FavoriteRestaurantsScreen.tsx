import React, { useEffect } from "react";
import { Text, FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux";
import { getFavoriteRestaurants } from "../redux";
import { RestaurantCard } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";

// Modified FavoriteRestaurantsScreen with testIDs
const FavoriteRestaurantsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { favoriteRestaurantSummaryList, loading, error } = useSelector((state: RootState) => state.favoriteRestaurants);

    useEffect(() => {
        dispatch(getFavoriteRestaurants());
    }, [dispatch]);

    const EmptyIndicator = () => (
        <View style={styles.emptyContainer} testID="emptyIndicator">
            <Text style={styles.emptyText}>You have no favorite restaurants yet!</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} testID="favoriteRestaurantsScreen">
            <Text style={styles.title} testID="screenTitle">Your Favorite Flavors</Text>

            {loading && <ActivityIndicator style={styles.emptyContainer} testID="loadingIndicator" />}
            {error && <Text style={styles.errorText} testID="errorMessage">{error}</Text>}

            {!loading && !error && (
                <>
                    {favoriteRestaurantSummaryList?.total === 0 ? (
                        <EmptyIndicator />
                    ) : (
                        <FlatList
                            data={favoriteRestaurantSummaryList?.restaurantSummaries}
                            scrollEnabled={true}
                            renderItem={({ item }) => (
                                <RestaurantCard key={item.id} restaurant={item} />
                            )}
                            testID="restaurantCardList"
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContentContainer}
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        padding: 10,
    },
    errorText: {
        color: "#FF3B30", // Red color for error messages
        textAlign: "center",
        marginVertical: 16,
    },
    listContentContainer: {
        flexGrow: 1,  // Ensure the list can expand to take available space
    },
    emptyContainer: {
        flex: 1,  // Ensure it takes the full available space
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 18,
        color: "#666",
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default FavoriteRestaurantsScreen;