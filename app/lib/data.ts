import { Product, User } from "./models";
import { connectToDb } from "./utils";

export const fetchUsers = async (q: string, page: number) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2

    console.log("q and page", q, page);


    try {
        connectToDb();
        const count = await User.countDocuments({ username: { $regex: regex } });
        const users = await User.find({ username: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        console.log("count:", count);

        return { count, users };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
}

export const fetchUser = async (id: any) => {

    console.log(id)
    try {
        connectToDb();
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
}

// เพิ่ม Products
export const fetchProducts = async (q: string, page: number) => {
    console.log(q)
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 2

    console.log("q and page", q, page);


    try {
        connectToDb();
        const count = await Product.countDocuments({ title: { $regex: regex } });
        const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        console.log("count:", count);//ถูกส่งเข้ามาในบรรทัดนั้น ๆ

        return { count, products };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch products!");
    }
}

export const fetchProduct = async (id: string) => {
    try {
        connectToDb();
        const product = await Product.findById(id);
        return product;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch Product!");
    }
}