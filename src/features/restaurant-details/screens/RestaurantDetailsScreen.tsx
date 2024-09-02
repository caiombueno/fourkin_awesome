import { View, Text, Image } from 'react-native';
import React from 'react';
import { RestaurantId } from '@models';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

interface RestaurantDetailsScreenProps {
    restaurantId: RestaurantId;
    restaurantImageUrl?: string;
}

type SharedElementsComponent = React.FC<RestaurantDetailsScreenProps> & {
    sharedElements?: (navigation: ReturnType<typeof useNavigation>) => any[];
};

const RestaurantDetailsScreen: SharedElementsComponent = (
    { restaurantId, restaurantImageUrl }
) => {
    console.log(restaurantId);
    return <View>
        <Text>Restaurant ID: {restaurantId}</Text>
        {restaurantImageUrl &&
            <SharedElement id={restaurantImageUrl}>
                <Image
                    style={{ width: '100%', height: 200 }} source={{ uri: restaurantImageUrl }} />
            </SharedElement>
        }
    </View>
}



export { RestaurantDetailsScreen };