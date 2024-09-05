import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux";
import { getFavoriteRestaurants } from "../redux";
import { RestaurantCard } from "@components";

const FavoriteRestaurantsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Get the state from Redux
    const { favoriteRestaurantSummaryList, loading, error } = useSelector((state: RootState) => state.favoriteRestaurants);

    // Fetch favorite restaurants when the screen is loaded
    useEffect(() => {
        dispatch(getFavoriteRestaurants());
    }, [dispatch]);

    // Empty Indicator Component
    const EmptyIndicator = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no favorite restaurants yet!</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Your Favorite Flavors</Text>

            {loading && <ActivityIndicator style={styles.emptyContainer} />}
            {error && <Text style={styles.errorText}>{error}</Text>}

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
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContentContainer}  // Ensures the list fills available space
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Allow the container to take the full available space\
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 20,
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