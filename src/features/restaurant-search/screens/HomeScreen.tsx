import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';
import { EmptyLocationIndicator, RestaurantCardListView, TextField } from '../components';
import { selectLocationSearchInput, selectNameSearchInput, setLocationInput, setNameInput } from '../redux';
import { useDispatch } from 'react-redux';
import { LocationPermissionStatus, LocationService } from '../services';


const HomeScreen: React.FC = () => {
    const location = selectLocationSearchInput();
    const name = selectNameSearchInput();
    const dispatch = useDispatch();

    const getLocation = async () => {
        // Request permission to access location
        const permissionStatus = await LocationService.requestLocationAccessPermission();
        if (permissionStatus !== LocationPermissionStatus.granted) return;

        const { city, region, country } = await LocationService.getCurrentLocation();

        dispatch(setLocationInput(`${city}, ${region}, ${country}`));
    };

    useEffect(() => { getLocation() }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 10 }} >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.greeting}>Hello, username!</Text>
                    <View style={styles.inputContainer}>
                        <TextField
                            key={location}
                            value={location}
                            onChangeText={(location) => dispatch(setLocationInput(location))}
                            placeholder="Enter location"
                        />
                        <TextField
                            value={name}
                            onChangeText={(name) => dispatch(setNameInput(name))}
                            placeholder="Enter name"
                        />
                    </View>
                </View>
                {location !== '' ?
                    <RestaurantCardListView key={location} location={location} style={styles.restaurantListView} />
                    : <EmptyLocationIndicator onRetryLocation={getLocation} />
                }
            </SafeAreaView>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flex: 1,
    },
    greeting: {
        fontSize: 18,
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        // justifyContent: 'space-between',
    },
    restaurantListView: {
        flex: 10,
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
