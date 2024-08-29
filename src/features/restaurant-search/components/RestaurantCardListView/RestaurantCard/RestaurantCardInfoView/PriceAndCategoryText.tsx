import { Text, StyleSheet } from 'react-native';

const PriceAndCategoryText: React.FC<{
    price: string | null,
    category: string | null
}> = ({
    price,
    category
}) =>
        <Text style={styles.subTitle}>
            {price || ''} • {category || 'Unknown Category'}
        </Text>;

export default PriceAndCategoryText;

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
    },

});

