import Image from 'next/image';
import styles from "../../../ui/dashboard/users/signalUser/singleUser.module.css";
import { fetchUser } from '@/app/lib/data';
import { updateUser } from '@/app/lib/actions';

const SignalProductPage = async ({ params }: any) => {
    const { id } = params;
    const user = await fetchUser(id);
    console.log(user)
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={user.img || "/image.png"} alt="" fill />
                </div>
                {user.username}
            </div>
            <div className={styles.forminfoContainer}>
                <form action={updateUser} className={styles.form}>
                    <input type="hidden" name='id' value={user.id} />
                    <label>Username</label>
                    <input type="text" name="username" placeholder={user.username} />
                    <label>Email</label>
                    <input type="email" name="email" placeholder={user.email} />
                    <label>Password</label>
                    <input type="password" name="password" />
                    <label>Phone</label>
                    <input type="text" name="phone" placeholder={user.phone} />
                    <label>Address</label>
                    <textarea name="address" placeholder={user.address} />
                    <label>Is Admin?</label>
                    <select name="isAdmin" id="isAdmin">
                        <option value='true' selected={user.isAdmin}>Yes</option>
                        <option value='false' selected={!user.isAdmin}>No</option>
                    </select>
                    <label>Is Active?</label>
                    <select name="isActive" id="isActive">
                        <option value='true' selected={user.isActive}>Yes</option>
                        <option value='false' selected={!user.isActive}>No</option>
                    </select>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};
export default SignalProductPage;