"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_entity_1 = require("./cart.entity");
const order = {
    id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
    userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    cartId: '',
    items: cart_entity_1.cart.items,
    payment: {
        type: 'paypal',
        address: undefined,
        creditCard: undefined
    },
    delivery: {
        type: 'post',
        address: undefined
    },
    comments: '',
    status: 'created',
    total: 2,
};
