
import { AccountScreen, FavoriteRestaurantsScreen, HomeScreen } from "@features";
import { ComponentType } from "react";
import { AppRoute } from "../models";

enum IoniconNames {
    home = 'home',
    heart = 'heart',
    person = 'person',
}

interface MainTabRoute extends AppRoute {
    name: keyof MainTabParamList;
    ioniconName: IoniconNames;
    component: ComponentType;
}

type MainTabParamList = {
    Home: undefined;
    Favorites: undefined;
    Account: undefined;
};


export interface MainTabRoutes {
    home: MainTabRoute;
    favorites: MainTabRoute;
    account: MainTabRoute;
}

const mainTabRoutes: MainTabRoutes = {
    home: {
        name: 'Home',
        ioniconName: IoniconNames.home,
        component: HomeScreen,
    },
    favorites: {
        name: 'Favorites',
        ioniconName: IoniconNames.heart,
        component: FavoriteRestaurantsScreen,
    },
    account: {
        name: 'Account',
        ioniconName: IoniconNames.person,
        component: AccountScreen,
    },
};

export { mainTabRoutes, MainTabParamList, MainTabRoute, IoniconNames }