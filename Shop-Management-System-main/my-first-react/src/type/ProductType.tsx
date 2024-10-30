import CategoryType from "./categoryType";

interface ProductType{
    id:number;
    name:string;
    price:number;
    description:string;
    category:CategoryType
}
export default ProductType;