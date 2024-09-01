import { ComponentType } from "react";

interface AppRoute {
    name: string;
    screen: ComponentType;
}

export default AppRoute;