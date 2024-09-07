import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Category, ReviewSerializable } from '@models';
import { IsOpenNowIndicator } from '@components';

// Get the screen dimensions
const { width } = Dimensions.get('window');

export const RestaurantDetailsView: React.FC<{
    price: string | null;
    rating: number | null;
    categories: Category[];
    isOpenNow: boolean | null;
    reviews: ReviewSerializable[];
    address: string | null;
}> = ({
    price,
    rating,
    categories,
    isOpenNow,
    reviews,
    address,
}) => {

        const categoryTitle = (categories.length > 0) ? categories[0].title : '';
        return (
            <View testID='RestaurantDetailsView' style={styles.container}>
                {/* Restaurant Name, Price, and Open Status */}
                <View style={styles.header}>
                    <Text style={styles.price}>{price} {categoryTitle}</Text>
                    <IsOpenNowIndicator isOpenNow={isOpenNow} />
                </View>

                <Divider />

                {/* Address Title */}
                <Text style={styles.sectionTitle}>Address</Text>

                <GapH10 />

                {/* Address */}
                <Text style={styles.address}>{address}</Text>

                <Divider />

                {/* Overall Rating Title */}
                <Text style={styles.sectionTitle}>Overall Rating</Text>

                <GapH10 />

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{rating}</Text>
                    <Text style={styles.star}>★</Text>
                </View>

                {/* Divider */}
                <Divider />

                {/* Reviews */}
                <Text style={styles.sectionTitle}>{reviews.length} Reviews</Text>
                <FlatList
                    data={reviews}
                    scrollEnabled={false}
                    keyExtractor={review => review.id}
                    renderItem={({ item: review }) => (
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewRating}>
                                {'★'.repeat(review.rating)}
                            </Text>
                            <GapH10 />
                            <Text style={styles.reviewText}>{review.text}</Text>
                            <GapH10 />
                            <View style={styles.userContainer}>
                                <Image source={{ uri: review.user.imageUrl ?? undefined }} style={styles.userImage} />
                                <GapW5 />
                                <Text style={styles.userName}>{review.user.name}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    };

const Divider = () => <View style={styles.divider} />;

const GapH10 = () => <View style={{ height: 10 }} />;

const GapW5 = () => <View style={{ width: 5 }} />;

const styles = StyleSheet.create({
    container: {
        padding: width * 0.05, // 5% of screen width
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: width * 0.02, // 2% of screen width
    },
    price: {
        fontSize: width * 0.04, // 4% of screen width
        color: '#666',
    },
    openStatus: {
        fontSize: width * 0.04, // 4% of screen width
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: width * 0.05, // 3% of screen width
    },
    sectionTitle: {
        fontSize: width * 0.04, // 4.5% of screen width
        color: '#333',
        // marginBottom: width * 0.02, // 2% of screen width
    },
    address: {
        fontSize: width * 0.045, // 4.5% of screen width
        fontWeight: 'bold',
        color: '#333',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: width * 0.07, // 7% of screen width
        fontWeight: 'bold',
    },
    star: {
        fontSize: width * 0.04, // 7% of screen width
        color: '#FFD700',
    },
    reviewContainer: {
        marginVertical: width * 0.02, // 2% of screen width
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: width * 0.02, // 2% of screen width
    },
    reviewRating: {
        fontSize: width * 0.045, // 4.5% of screen width
        color: '#FFD700',
    },
    reviewText: {
        // marginVertical: width * 0.02, // 2% of screen width
        fontSize: width * 0.04, // 4% of screen width
        color: '#333',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: width * 0.02, // 2% of screen width
    },
    userImage: {
        width: width * 0.08, // 8% of screen width
        height: width * 0.08, // 8% of screen width
        borderRadius: (width * 0.08) / 2, // Make it circular
        // marginRight: width * 0.02, // 2% of screen width
    },
    userName: {
        fontSize: width * 0.04, // 4% of screen width
        color: '#333',
    },
});

