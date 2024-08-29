import { View, ViewStyle } from "react-native";

const Row: React.FC<{
    style?: ViewStyle;
    children: React.ReactNode;
}> = ({ style, children }) => <View style={{ flexDirection: 'row', ...style }}>{children}</View>;

export default Row;