// https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-303661539

import { NavigationActions, NavigationParams, NavigationRoute } from 'react-navigation';

let navigator: any;

function setContainer(container: object) {
    navigator = container;
}

function navigate(routeName: string, params?: NavigationParams) {
    navigator.dispatch(
        NavigationActions.navigate({
            // @ts-ignore
            type: 'Navigation/NAVIGATE',
            routeName,
            params
        })
    );
}

function getCurrentRoute(): NavigationRoute | null {
    if (!navigator || !navigator.state.nav) {
        return null;
    }

    return navigator.state.nav.routes[navigator.state.nav.index] || null;
}

export default {
    setContainer,
    navigate,
    getCurrentRoute
};
