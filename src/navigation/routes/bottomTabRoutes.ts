
import { AccountScreen, FavoriteRestaurantsScreen, HomeScreen } from "@features";
import { ComponentType } from "react";
import { AppRoute } from "../models";

enum IoniconNames {
    home = 'home',
    heart = 'heart',
    person = 'person',
}

interface BottomTabRoute extends AppRoute {
    name: keyof BottomTabParamList;
    ioniconName: string;
    screen: ComponentType;
}

type BottomTabParamList = {
    Home: undefined;
    Favorites: undefined;
    Account: undefined;
};


export interface BottomTabRoutes {
    home: BottomTabRoute;
    favorites: BottomTabRoute;
    account: BottomTabRoute;
}

const bottomTabRoutes: BottomTabRoutes = {
    home: {
        name: 'Home',
        ioniconName: IoniconNames.home,
        screen: HomeScreen,
    },
    favorites: {
        name: 'Favorites',
        ioniconName: IoniconNames.heart,
        screen: FavoriteRestaurantsScreen,
    },
    account: {
        name: 'Account',
        ioniconName: IoniconNames.person,
        screen: AccountScreen,
    },
};

export default bottomTabRoutes;
export { BottomTabParamList, BottomTabRoute }