
const tax = 13;

export default function AddTax (price){
    return price + (price * tax/100);
}
