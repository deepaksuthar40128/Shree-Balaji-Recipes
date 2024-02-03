'use client'
import "./page.scss"
import Link from 'next/link';
import { signIn } from 'next-auth/react'
import { useState } from "react";
const Login: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({'callbackUrl':'/'});
    const handleSubmit = (e: Event): void => {
        e.preventDefault(); 
        console.log(formData);
        signIn('credentials', formData);
    }
    return (
        <div>
            <form onSubmit={handleSubmit as any}
                className="log-in">
                <h4>Shree <span>Balaji</span> Recepi</h4>
                <p>Welcome back! Log in to your account to view today recepis:</p>
                <div className="floating-label">
                    <input
                        onChange={(e) => { setFormData((prev) => ({ ...prev, 'email': e.target.value })) }}
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                    />
                    <label htmlFor="email">Email:</label>
                    <div className="icon">
                        <i className="fa fa-envelope"></i>
                    </div>
                </div>
                <div className="floating-label">
                    <input
                        onChange={(e) => { setFormData((prev) => ({ ...prev, 'password': e.target.value })) }}
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                    />
                    <label htmlFor="password">Password:</label>
                    <div className="icon">
                        <i className="fa fa-key"></i>
                    </div>
                </div>
                <button type="submit">Log in</button>
            </form>
            <hr className="fancy_hr" />
            <div className="fancy_hr_word"> <span>More Action</span> </div>
            <div className="new_account">
                <p>Create New Account</p>
                <Link href='/register'><i className="fa fa-arrow-right"></i></Link>
                <button type="submit" onClick={() => { signIn("google"); }}>Google</button>
            </div>
        </div>
    )
}

export default Login;