import { ImageStyle, StyleProp, Image } from "react-native"
import { SharedElement } from "react-navigation-shared-element"

export const SharedImage: React.FC<{
    url: string,
    style?: StyleProp<ImageStyle>
}> = ({ url, style }) => {
    return (
        <SharedElement id={url} >
            <Image
                style={style} source={{ uri: url }} />
        </SharedElement>
    )
}