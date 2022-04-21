import * as Typography from "./typography";

export const bg = 'oldlace';
export const navigationContainerBg = 'lightsalmon';
export const accentColor = 'darkred';

export const navigationContainerStyle = {
    headerStyle: {
        backgroundColor: navigationContainerBg
    },
    headerTitleStyle: Typography.headerBar,
    headerTintColor: 'black'
};

export const container = {
    backgroundColor: bg,
};

export const innerContainer = {
    backgroundColor: bg,
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
};

export const base = {
    backgroundColor: bg,
    flexGrow: 1,
    flexShrink: 2,
};

export const cell = {
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 3,
    paddingTop: 3,
};

export const imgContainer = [
    innerContainer, {
        alignSelf: 'center',
        width: 320,
        height: 240,
    }
];

export const invalidContainer = {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'red'
};
