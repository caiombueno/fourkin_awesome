import { View, StyleSheet } from "react-native";
import RestaurantNameText from "./RestaurantNameText";
import PriceAndCategoryText from "./PriceAndCategoryText";
import { IsOpenNowIndicator, Row } from "@components";
import RatingBar from "./RatingBar";

const RestaurantCardInfoView: React.FC<{
    name: string | null,
    price: string | null,
    isOpenNow: boolean | null,
    rating: number | null,
    categories: { title: string | null }[]
}> = ({
    name,
    price,
    isOpenNow,
    rating,
    categories
}) =>
        <View style={styles.infoContainer}>
            <RestaurantNameText name={name} />
            <PriceAndCategoryText price={price} category={categories[0]?.title} />
            <Row style={{ justifyContent: 'space-between' }} >
                <RatingBar rating={rating} />
                <IsOpenNowIndicator isOpenNow={isOpenNow} />
            </Row>
        </View>;

export default RestaurantCardInfoView;

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

