import { products } from "./data/products.js";
import CalculateDiscount from "./utils/discount.js";
import AddTax from "./utils/tax.js";


console.log("===========cost calculator==========");


products.forEach(
    (product) => {
        console.log("product id  :" + product.id);
        console.log("product  name :" + product.name)
        console.log("product original price :" + product.price);
        let priceAfterDiscount = CalculateDiscount(product.price, 50);
        console.log("Price after discount : " + priceAfterDiscount);
        console.log("price after tax : ", AddTax(priceAfterDiscount));
        console.log("==================")
    }
)
