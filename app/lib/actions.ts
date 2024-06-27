"use server"

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDb } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";


export const addUser = async (formData: any) => {
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDb();
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // ตรวจสอบว่าชื่อผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists. Please choose a different username.");
        }

        const newUser = new User({
            username, email, password: hashedPassword, phone, address, isAdmin, isActive,
        });

        console.log("newUser=>", newUser, hashedPassword);

        await newUser.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create user!");
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
};

//กำหนด Typeuser ซื่อๆ 
interface UserUpdateFields {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    isAdmin?: boolean;
    isActive?: boolean;
}

//typeproduct
interface ProductUpdateFields {
    title?: string;
    desc?: string;
    price?: number;
    stock?: number;
    color?: string;
    size?: string;
}

//อัปเดตUser
export const updateUser = async (formData: any) => {
    const { id, username, email, password, phone, address, isAdmin, isActive } =
        Object.fromEntries(formData);

    try {
        connectToDb();

        const updateFields: UserUpdateFields = {
            username,
            email,
            password,
            phone,
            address,
            isAdmin,
            isActive,
        };

        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key as keyof UserUpdateFields] === "" || undefined) && delete updateFields[key as keyof UserUpdateFields]
        );

        await User.findByIdAndUpdate(id, updateFields);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user!");
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
};

//อัปเดตProduct
export const updateProduct = async (formData: any) => {
    const { id, title, desc, price, stock, color, size } =
        Object.fromEntries(formData);

    try {
        connectToDb();

        const updateFields: ProductUpdateFields = {
            title,
            desc,
            price,
            stock,
            color,
            size,
        };

        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key as keyof ProductUpdateFields] === "" || undefined) && delete updateFields[key as keyof ProductUpdateFields]
        );

        await Product.findByIdAndUpdate(id, updateFields);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user!");
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
};

//เพิ่มProduct
export const addProduct = async (formData: any) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    // ไว้เช็คข้อมูล
    // รักนะเตยเตย อย่าโกรธดรีมบ่อยเลย
    console.log("formData", { title, desc, price, stock, color, size });


    try {
        connectToDb();
        const newProduct = new Product({
            title, desc, price, stock, color, size
        });

        await newProduct.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create product!");
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
};


//deleteproduct
export const deleteProduct = async (formData: any) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Product.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete product!");
    }
    revalidatePath("/dashboard/products")
};

//deleteuser
export const deleteUser = async (formData: any) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }
    revalidatePath("/dashboard/users");
};

export const authenticate = async (prevState: any, formData: any) => {
    const { username, password } = Object.fromEntries(formData);
    console.log("username, password =>", username, password);


    try {
        console.log("dream");

        await signIn("credentials", { username, password });

    } catch (err: any) {
        return "Wrong Credentials!";
    }
}