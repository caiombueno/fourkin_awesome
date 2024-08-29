import { Row } from "@components";
import { View, StyleSheet, Text } from "react-native";
import React from 'react';

const IsOpenNowIndicator: React.FC<{ isOpenNow: boolean | null }> = ({ isOpenNow }) =>
    <Row style={{ alignItems: 'center' }}>
        <IsOpenNowText isOpenNow={isOpenNow} />
        <View style={{ width: 4 }} />
        <IsOpenNowIcon isOpenNow={isOpenNow} />
    </Row>;

const IsOpenNowIcon: React.FC<{ isOpenNow: boolean | null }> = ({ isOpenNow }) =>
    <View style={[styles.statusIndicator, { backgroundColor: isOpenNow ? 'green' : 'red' }]} />;

const IsOpenNowText: React.FC<{ isOpenNow: boolean | null }> = ({ isOpenNow }) =>
    <Text style={[styles.statusText, { color: isOpenNow ? 'green' : 'red' }]}>
        {isOpenNow ? 'Open Now' : 'Closed'}
    </Text>


export default IsOpenNowIndicator;

const styles = StyleSheet.create({
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusText: {
        fontSize: 14,
        color: 'green',
    },
    statusIndicator: {
        width: 7,
        height: 7,
        backgroundColor: 'green',
        borderRadius: 5,
    },
});
