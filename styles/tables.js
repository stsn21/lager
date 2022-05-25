import * as Base from "./base";

export const orderItemsColumnFlex = {
    name: [
        Base.cell,
        {
            flexBasis: 10,
            flexGrow: 2,
            flexShrink: 10,
        }
    ],
    qty: [
        Base.cell,
        {
            flexBasis: 1,
            flexGrow: 0.5,
            flexShrink: 0,
        }
    ],
    location: [
        Base.cell,
        {
            flexBasis: 1,
            flexGrow: 0.5,
            flexShrink: 0,
        }
    ]
};
