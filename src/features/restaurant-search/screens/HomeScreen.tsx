import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { EmptyLocationIndicator, RestaurantCardListView, TextField } from '../components';
import { selectLocationSearchInput, setLocationInput } from '../redux';
import { useDispatch } from 'react-redux';
import { LocationPermissionStatus, LocationService } from '../services';
import { AppDispatch } from '@redux';

const HomeScreen: React.FC = () => {
    const location = selectLocationSearchInput();
    const dispatch: AppDispatch = useDispatch();

    const getLocation = async () => {
        // Request permission to access location
        const permissionStatus = await LocationService.requestLocationAccessPermission();
        if (permissionStatus !== LocationPermissionStatus.granted) return;

        const { city, region, country } = await LocationService.getCurrentLocation();
        dispatch(setLocationInput(`${city}, ${region}, ${country}`));
    };

    useEffect(() => { getLocation() }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <HomeScreenHeader location={location} setLocationInput={(location) => { dispatch(setLocationInput(location)) }} />
            {location === '' ? (
                <EmptyLocationIndicator onRetryLocation={getLocation} />
            ) : (
                <RestaurantCardListView key={location} location={location} style={styles.restaurantListView} />
            )}
        </SafeAreaView>
    );
};

const HomeScreenHeader: React.FC<{ location: string, setLocationInput: (location: string) => void }> = ({ location, setLocationInput }) => {
    return (
        <View testID='HomeScreenHeader' style={styles.headerContainer}>
            <Text style={styles.greeting}>Hello, username!</Text>
            <View style={styles.inputContainer}>
                <TextField
                    key={location}
                    value={location}
                    onChangeText={setLocationInput}
                    placeholder="Enter location"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        padding: 10,
    },
    greeting: {
        fontSize: 18,
        marginBottom: 10,
    },
    inputContainer: {
        // marginBottom: 10, // Provide some spacing below the input field
    },
    restaurantListView: {
        // flex: 1, // Ensure this fills the remaining space
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    emptyStateText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default HomeScreen;
