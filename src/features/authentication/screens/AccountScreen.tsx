import React from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux'; // Assuming these are your store types
import { logoutUser, selectCurrentUser } from '../redux'; // Assuming this is your logout action
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationParams } from '@navigation'; // Your navigation params

type AuthScreenNavigationProp = StackNavigationProp<AppNavigationParams, 'Auth'>;

const navigateToAuth = () => {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    return () => navigation.replace('Auth');
}

const AccountScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const goToAuth = navigateToAuth(); // Navigation hook for redirection

    const { email, uid } = selectCurrentUser() || {};

    const confirmLogout = () => {
        // Show confirmation alert
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: handleLogout, // If user confirms, proceed to logout
                },
            ],
            { cancelable: true }
        );
    };

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            goToAuth(); // Navigate to AuthScreen after successful logout
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                {/* User ID */}
                <Text style={styles.infoText}>
                    <Text style={styles.labelText}>User ID: </Text>{uid}
                </Text>

                {/* Email */}
                <Text style={styles.infoText}>
                    <Text style={styles.labelText}>Email: </Text>{email}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={confirmLogout} color="#007AFF" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Take full available space
        padding: 16,
        justifyContent: 'space-between', // Ensure content and button are spaced
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center', // Center user info in the middle of the screen
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        marginVertical: 8,
        color: '#333', // Dark gray text for readability
    },
    labelText: {
        fontWeight: 'bold', // Make the "User ID:" and "Email:" bold
        color: '#000', // Darker color for the label
    },
    buttonContainer: {
        paddingBottom: 20, // Padding for button at the bottom
    },
});

export default AccountScreen;