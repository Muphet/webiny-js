// @flow
import * as React from "react";
import { connect } from "react-redux";
import {
    enableDarkMode,
    disableDarkMode,
    toggleDarkMode,
    chooseInitialTheme
} from "webiny-app-admin/actions";

import { selectTheme } from "webiny-app-admin/selectors";

export type WithThemeProps = {
    enableDarkMode: () => void,
    disableDarkMode: () => void,
    toggleDarkMode: () => void,
    chooseInitialTheme: () => void,
    theme: Object
};

export const withTheme = () => {
    return (BaseComponent: React.ComponentType<*>) => {
        return connect(
            state => ({ theme: selectTheme(state) }),
            { enableDarkMode, disableDarkMode, toggleDarkMode, chooseInitialTheme }
        )(BaseComponent);
    };
};
