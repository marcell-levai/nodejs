"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const product_entity_1 = require("./product.entity");
const cartItem = {
    product: product_entity_1.product,
    count: 2,
};
exports.cart = {
    id: '1434fec6-cd85-420d-95c0-eee2301a971d',
    userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    isDeleted: false,
    items: [cartItem],
};
