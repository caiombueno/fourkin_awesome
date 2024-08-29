import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { RestaurantCardListView } from '../components';




const HomeScreen: React.FC = () => {
    return (
        <SafeAreaView>
            <RestaurantCardListView location='Itapetininga, São Paulo, Brazil' />
        </SafeAreaView>
    );
};

export default HomeScreen;
