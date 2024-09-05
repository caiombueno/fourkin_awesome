import { View, ViewStyle } from "react-native";

const Row: React.FC<{
    style?: ViewStyle;
    children: React.ReactNode;
    testID?: string | undefined;
}> = ({ style, children, testID }) => <View testID={testID} style={{ flexDirection: 'row', ...style }}>{children}</View>;

export default Row;