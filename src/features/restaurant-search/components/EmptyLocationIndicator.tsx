import { Button, GestureResponderEvent, StyleSheet, View, Text } from "react-native";
import React from 'react';

const EmptyLocationIndicator: React.FC<{ onRetryLocation: (event: GestureResponderEvent) => void }> = ({ onRetryLocation }) => (
    <View testID="EmptyLocationIndicator" style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Enter your location to discover restaurants near you!</Text>
        <Button title="Retry Location" onPress={onRetryLocation} />
        <Text style={styles.emptyStateText}>or manually enter a location in the input above.</Text>
    </View>
);

export default EmptyLocationIndicator;

const styles = StyleSheet.create({
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