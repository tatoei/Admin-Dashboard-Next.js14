import Search from '@/app/ui/dashboard/search/search'
import styles from '../../ui/dashboard/users/users.module.css'
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchUsers } from '@/app/lib/data';
import { deleteUser } from '@/app/lib/actions';

const UsersPage = async ({ searchParams }: any) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    console.log("dream luv toei mak mak I moo");


    const { count, users } = await fetchUsers(q, page);

    return (

        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..." />
                <a href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created At</td>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(users => (
                        <tr key={users.id}>
                            <td><div className={styles.user}>
                                <Image src={users.img || "/image copy 2.png"} alt="" width={40} height={40} className={styles.userImage} />
                                {users.username}
                            </div>
                            </td>
                            <td >{users.email}</td>
                            <td>{users.createdAt?.toString().slice(4, 16)}</td>
                            <td>{users.isAdmin ? "Admin" : "Cliend"}</td>
                            <td>{users.isAvtive ? "Avtive" : "passive"}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/${users.id}`} >
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <form action={deleteUser}>
                                        <input type="hidden" name='id' value={users.id} />
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

export default UsersPage
