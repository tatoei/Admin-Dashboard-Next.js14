import Image from 'next/image'
import styles from './rightbar.module.css'
import { MdAccessTimeFilled, MdChromeReaderMode } from "react-icons/md";
const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/image copy.png" alt="" fill className={styles.bg}/>
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>👻 Availble Now</span>
                    <h3 className={styles.title}>Sararawee Sirirat</h3>
                    <span className={styles.subtitle}>the cat with four ears</span>
                    <p className={styles.desc}>Chicago, Illinois, couple Valerie and Ted Rock took the cat in two years ago after they visited a local bar, where a group of drinkers were handing the animal around and making fun of him.</p>
                    <button className={styles.button}>
                        <MdAccessTimeFilled />
                        Watch
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/image copy.png" alt="" fill className={styles.bg}/>
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>👻 Availble Now</span>
                    <h3 className={styles.title}>Sararawee Sirirat</h3>
                    <span className={styles.subtitle}>the cat with four ears</span>
                    <p className={styles.desc}>Chicago, Illinois, couple Valerie and Ted Rock took the cat in two years ago after they visited a local bar, where a group of drinkers were handing the animal around and making fun of him.</p>
                    <button className={styles.button}>
                        <MdChromeReaderMode />
                        Learn
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Rightbar