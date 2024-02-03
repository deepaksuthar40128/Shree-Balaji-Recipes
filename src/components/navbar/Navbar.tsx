'use client'
import Link from 'next/link';
import './Navbar.scss'
import { useEffect, useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/context/ThemeContext';
import { useSession, signOut } from 'next-auth/react'
const NavBar: React.FunctionComponent = () => {
    const session = useSession();
    console.log(session);
    const { mode, toggle }: ThemeContextType = useContext(ThemeContext);

    const hello = () => {
        document.getElementById('nav-toggle')?.classList.toggle('active');
        const navList = document.getElementById('nav-list');
        if (document.getElementById('nav-toggle')?.classList.contains('active')) {
            if (navList) {
                navList.style.display = 'block';
            }
        }
        else {
            if (navList) {
                navList.style.display = 'none';
            }
        }
    } 
    return (
        <div>
            <section className="navigation">
                <div className="nav-container">
                    <div className="brand">
                        <a href="#!">🍅 Shree BalaJi Racipes</a>
                    </div>
                    <nav>
                        <div className="nav-mobile">
                            <a onClick={hello} id="nav-toggle" href="#!"><span></span></a>
                        </div>
                        <ul id='nav-list' className="nav-list">
                            <li><Link href="/">Home</Link></li> 
                            <li>
                                <span className="service">Features
                                    <ul className="nav-dropdown">
                                        <li><a href="/add">Add Recipe</a></li> 
                                        <li><span onClick={toggle} >Switch to {mode == 'light' ? "Dark" : "Light"} mode</span></li>
                                    </ul>
                                </span>
                            </li>
                            <li><Link href="/about">About</Link></li>
                            {
                                session.status === 'loading' ? <li>Loading</li> :
                                    session.status === 'unauthenticated' ? <li><Link href="/login" >Login</Link></li> :
                                        <li><Link href="/logout" onClick={signOut as any}>Logout</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    )
}

export default NavBar;