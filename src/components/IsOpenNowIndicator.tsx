import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Row from "./Row";

export const IsOpenNowIndicator: React.FC<{
    isOpenNow: boolean | null;
    textSize?: number; // Allow customization of text size
    indicatorSize?: number; // Allow customization of the indicator size
    spacing?: number; // Allow customization of spacing between text and indicator
}> = ({
    isOpenNow,
    textSize = 14, // Default text size
    indicatorSize = 7, // Default indicator size
    spacing = 4 // Default spacing
}) => (
        <Row style={{ alignItems: 'center' }}>
            <IsOpenNowText isOpenNow={isOpenNow} textSize={textSize} />
            <View style={{ width: spacing }} />
            <IsOpenNowIcon isOpenNow={isOpenNow} indicatorSize={indicatorSize} />
        </Row>
    );

const IsOpenNowIcon: React.FC<{
    isOpenNow: boolean | null;
    indicatorSize: number;
}> = ({ isOpenNow, indicatorSize }) => (
    <View
        style={[
            styles.statusIndicator,
            {
                backgroundColor: isOpenNow ? 'green' : 'red',
                width: indicatorSize,
                height: indicatorSize,
                borderRadius: indicatorSize / 2,
            },
        ]}
    />
);

const IsOpenNowText: React.FC<{
    isOpenNow: boolean | null;
    textSize: number;
}> = ({ isOpenNow, textSize }) => (
    <Text
        style={[
            styles.statusText,
            { fontSize: textSize },
        ]}
    >
        {isOpenNow ? 'Open Now' : 'Closed'}
    </Text>
);

const styles = StyleSheet.create({
    statusText: {
        fontSize: 14, // Default font size, can be overridden by props
        fontStyle: 'italic',
    },
    statusIndicator: {
        backgroundColor: 'green',
    },
});
