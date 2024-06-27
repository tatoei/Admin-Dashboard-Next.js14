"use client"
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

const MenuLink = ({item}:any) => {

    const pathname = usePathname()


    return (
        <a href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
            {item.icon}
            {item.title}
        </a>
    )
}

export default MenuLink
