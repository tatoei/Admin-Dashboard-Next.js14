import Image from "next/image"
import Link from "next/link"
import styles from "../../ui/dashboard/products/products.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions"

const ProductsPage = async ({ searchParams }: any) => {

    const q = searchParams?.q || ""; //ที่ค้นหา
    const page = searchParams?.page || 1; //หน้า
    const { count, products } = await fetchProducts(q, page);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a products..." />
                <a href="/dashboard/products/add">
                    <button className={styles.addButton}>Add New</button>
                </a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Created</td>
                        <td>Stock</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td><div className={styles.product}>
                                <Image src={product.img || "/image copy 3.png"} alt="" width={40} height={40} className={styles.productImage} />
                                {product.title}
                            </div>
                            </td>
                            <td >{product.desc}</td>
                            <td>${product.price}</td>
                            <td>{product.createdAt?.toString().slice(4, 16)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/products/${product.id}`} >
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <form action={deleteProduct}>
                                        {/* hidden คือปิดให้idproductหาย */}
                                        <input type="hidden" name="id" value={product.id} />
                                        <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>

    )
}

export default ProductsPage
