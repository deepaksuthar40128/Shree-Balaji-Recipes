'use client'
import "@/app/(auth)/login/page.scss"
import "./page.scss"
import { FormEvent, useState } from "react"
import Link from "next/link"
import { postCalls } from "@/utils/apiCalls"
const Register: React.FunctionComponent = (): React.ReactNode => {
    const [userFile, setUserFile] = useState<File | null | string>(null);
    const [profileUrl, setProfileUrl] = useState<string | ArrayBuffer>('/img/upload_img.png');
    const [userData, setUserData] = useState<{ [key: string]: string }>({
        'username': '',
        'email': '',
        'password': '',
        'profile': '/img/upload_img.png'
    })
    const loadFile = (ele: HTMLInputElement): void => {
        if (ele?.files?.length) {
            let file = ele.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileUrl(e.target.result);
                    setUserFile(file);
                }
            };
            reader.readAsDataURL(file);
        }
    }
    const cancelUserImage = (): void => {
        setProfileUrl('/img/upload_img.png');
        setUserFile(null);
    }
    const uploadImageCall = async (image: any): Promise<{ 'path': string }> => {
        return new Promise(async (Resolve, Reject) => {
            try {
                let data = new FormData();
                data.set('image', image as File);
                data.set('imageName', image?.name as string);
                let res = await fetch('/api/recepi/uploadImage', {
                    method: 'POST',
                    body: data
                })
                if (res.ok) {
                    Resolve(await res.json());
                }
                else Reject(new Error("something wrong"));
            } catch (err) {
                console.log(err);
                Reject(err);
            }
        })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formData = new FormData;
        for (let key in userData) {
            formData.set(key, userData[key]);
        }
        if (userFile) {
            let data = await uploadImageCall(userFile);
            formData.set('profile', data.path);
        }
        let resData = await postCalls(formData, '/api/auth/register');
        console.log(resData);
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit} className="log-in">
                <p>Welcome to</p>
                <h4>Shree <span>Balaji</span> Recepi</h4>
                <div className="userProfile">
                    <div className={`cancel_profile ${profileUrl === '/img/upload_img.png' ? ' ' : "show_cancel_profile"}`}>
                        <i onClick={cancelUserImage} className="fa fa-times-circle"></i>
                    </div>
                    <label htmlFor="image">
                        <div className="mainProfile">
                            <img src={profileUrl as string} alt="user image" />
                        </div>
                    </label>
                </div>
                <input onChange={(e) => { loadFile(e.target); }} hidden type="file" name="image" id="image" />
                <div className="floating-label">
                    <input placeholder="Name" type="text" onChange={(e) => { setUserData((prev) => ({ ...userData, 'username': e.target.value })) }} name="text" id="text" />
                    <label htmlFor="email">Name:</label>
                    <div className="icon">
                        <i className="fa fa-user"></i>
                    </div>
                </div>
                <div className="floating-label">
                    <input placeholder="Email" type="email" onChange={(e) => { setUserData((prev) => ({ ...userData, 'email': e.target.value })) }} name="email" id="email" />
                    <label htmlFor="email">Email:</label>
                    <div className="icon">
                        <i className="fa fa-envelope"></i>
                    </div>
                </div>
                <div className="floating-label">
                    <input placeholder="Create Password" onChange={(e) => { setUserData((prev) => ({ ...userData, 'password': e.target.value })) }} type="password" name="password" id="password" />
                    <label htmlFor="password">Create Password:</label>
                    <div className="icon">
                        <i className="fa fa-key"></i>
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <hr className="fancy_hr" />
            <div className="fancy_hr_word"> <span>More Action</span> </div>
            <div className="new_account">
                <p>Already Account</p>
                <Link href='/login'><i className="fa fa-arrow-right"></i></Link>
            </div>
        </div>
    )
}

export default Register;