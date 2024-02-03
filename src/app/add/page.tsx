'use client'
import Image from 'next/image';
import './add.scss'
import Editor from '@/components/quill/editor';
import { useEffect, useState } from 'react';
import Card from '@/components/card/Card';
import { v4 as uuidv4 } from 'uuid'
import { useSession } from 'next-auth/react';
import Loading from '../loading';
const Add: React.FunctionComponent = () => {
    const [editorValue, setEditorValue] = useState('');
    const [heroFile, setHeroFile] = useState<File | null | string>(null);
    const [moreFiles, setMoreFiles] = useState<{ [key: string]: File | null | string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<String>('Loading...');
    const [dummyCard, setDummyCard] = useState({
        'title': "Sweet",
        'itemName': "Laddu",
        "cookingTime": '00:00',
        "serving": 0,
        "calories": 0,
        'heroImage': '/img/default.jpg',
        '_id':'1'
    })
    const [dummyRecepi, setDummyRecepi] = useState({
        username: 'Deepak Suthar',
        photos: {},
        recepi: '',
    })
    const handleEditorChange = (value: string) => {
        setDummyRecepi((prev) => ({ ...prev, 'recepi': editorValue }));
        setEditorValue(value);
    };
    const uploadheroFile = (file: FileList | null): void => {
        if (file?.length) {
            const onlyFile: File = file[0];
            setHeroFile((prev) => onlyFile);
            if (onlyFile) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    if (e.target?.result) {
                        setDummyCard((prev): any => ({ ...prev, 'heroImage': e.target?.result }));
                    }
                };
                reader.readAsDataURL(onlyFile);
            }
        }
    }
    const uploadMoreImages = (ele: HTMLInputElement): void => {
        let files = ele.files;
        if (files?.length) {
            Array.from(files).forEach(file => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target?.result) {
                            let key = uuidv4();
                            setMoreFiles((prev) => ({ ...prev, [key]: file }));
                            setDummyRecepi((prev) => ({ ...prev, 'photos': { ...prev.photos, [key]: e.target?.result } }));
                            ele.value = ''
                        }
                    };
                    reader.readAsDataURL(file);
                }
            })
        }
    }

    const chancelHero = (): void => {
        setDummyCard((prev) => ({ ...prev, 'heroImage': '/img/default.jpg' }));
        setHeroFile(null);
    }
    const cancelMoreImages = (ele: any, id: string): void => {
        let newMoreFiles = { ...moreFiles };
        delete newMoreFiles[id];
        setMoreFiles(newMoreFiles);
        let newMoreFiles2: any = { ...dummyRecepi.photos };
        delete newMoreFiles2[id];
        setDummyRecepi((prev) => ({ ...prev, 'photos': newMoreFiles2 }));
    }
    const uploadImageCall = async (image: any) => {
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
    const session = useSession();
    const postResipe = async (): Promise<any> => {
        setLoading(true);
        setLoadingText('Creating Recepi....')
        if (!session.data || session.data == undefined || session.data.user == undefined) { location.href = '/'; return; }
        let user: { id?: string, name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; } = session.data.user; 
        let textData: { [key: string]: string | number | string[] | any } = {
            'title': dummyCard.title,
            'itemName': dummyCard.itemName,
            'cookingTime': dummyCard.cookingTime,
            'serving': dummyCard.serving,
            'calories': dummyCard.calories,
            'recepi': dummyRecepi.recepi,
            'heroImage': '/img/default.jpg',
            'id': user.id,
            'photos': [],
        };
        if (heroFile) {
            let data: { [key: string]: string } = await uploadImageCall(heroFile) as { [key: string]: string };
            textData.heroImage = data.path;
        }
        let moreFileUrl: string[] = [];
        if (moreFiles) {
            let ct = 0, total = Object.entries(moreFiles).length;
            await Promise.all(
                Object.entries(moreFiles).map(async image => {
                    let data: { [key: string]: string } = await uploadImageCall(image[1]) as { [key: string]: string };
                    moreFileUrl.push(data.path);
                    ct++;
                    setLoadingText(`${ct}/${total}`)
                }))
        }
        textData = { ...textData, photos: moreFileUrl };
        let formData = new FormData();
        formData.set('data', JSON.stringify(textData));
        let res = await fetch('/api/recepi/add', {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            let data = await res.json();
            if (data.success) {
                alert("Recepi Added Successfully");
            }
            location.href = '/';
        }
    }

    useEffect(() => {
        if (session.status == 'authenticated') {
            setDummyRecepi((prev) => ({ ...prev, 'username': session.data.user?.name as string }));
        }
        else if (session.status == 'unauthenticated') {
            location.href = '/login'
        }
    }, [session])
    const parseMonth = (num: number): string => {
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month[num];
    }
    return (
        !loading ?
            <div className="main_add">
                < div className="add_editor" >
                    <div className="main_editor">
                        <div className="add_form">
                            <p>Fill Details</p>
                            <input type="text" onChange={(e) => { setDummyCard((prev) => ({ ...prev, 'itemName': e.target.value })) }} name="itemName" id="itemName" placeholder="Item Name... Laddu,Jalabi etc." />
                            <input type="text" onChange={(e) => { setDummyCard((prev) => ({ ...prev, 'title': e.target.value })) }} name="title" id="title" placeholder="Title" />
                            <input type="number" onChange={(e) => { setDummyCard((prev) => ({ ...prev, 'serving': parseInt(e.target.value) })) }} min={1} name="serving" id="serving" placeholder="Serving" />
                            <input type="time" onChange={(e) => { setDummyCard((prev) => ({ ...prev, 'cookingTime': e.target.value })) }} name="cookingTime" id="cookingTime" />
                            <input type="number" onChange={(e) => { setDummyCard((prev) => ({ ...prev, 'calories': parseInt(e.target.value) })) }} min={1} name="calories" id="calories" placeholder="Calories" />
                        </div>
                        <div className="add_recepi">
                            <p className='add_recepi_p'>Write Recepi Here</p>
                            <Editor value={editorValue} onChange={handleEditorChange} />
                        </div>
                    </div>
                    <div className="add_images">
                        <div className="add_hero_image">
                            <div className="add_hero_input_file">
                                <p>Upload Main Image</p>
                                <label htmlFor="heroBtn">
                                    <div>
                                        <i className="fa fa-upload"></i>
                                        <p>Upload File</p>
                                    </div>
                                </label>
                                <input onChange={(e) => { uploadheroFile(e.target.files) }} hidden type="file" name="hero" id="heroBtn" />
                            </div>
                            <div className="hero_preview">
                                <div>
                                    {
                                        heroFile &&
                                        <i onClick={chancelHero} className="fa fa-times-circle"></i>
                                    }
                                    <Image alt='hero' src={dummyCard.heroImage} width={200} height={200} layout='responsive' />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="add_other_images">
                            <div className="add_more_images_input_file">
                                <p>Upload More Images</p>
                                <label htmlFor="images">
                                    <div>
                                        <i className="fa fa-upload"></i>
                                        <p>Upload File</p>
                                    </div>
                                </label>
                                <input hidden onChange={(e) => uploadMoreImages(e.target)} type="file" name="images" id="images" multiple />
                            </div>
                            <div className="more_image_preview">
                                {
                                    Object.entries(dummyRecepi.photos).map(photo => (
                                        <div key={photo[0]}>
                                            <i onClick={(e) => { cancelMoreImages(e.target, photo[0]) }} className="fa fa-times-circle"></i>
                                            <img alt='hero' src={photo[1] as string} width={200} height={200} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div >
                <div className="add_preview">
                    <div className="preview_heading">
                        <h2>Preview</h2>
                    </div>
                    <div className="card_preview">
                        <div className="card_preview_text">
                            <h3>This is How Your Recepi Featured</h3>
                            <br />
                            <small>This is the card which is shown <br />on the users home page and when user <br /> click it, the below recepi is shown to user.</small>
                        </div>
                        <div className="card_preview_look">
                            <Card data={dummyCard} />
                        </div>
                    </div>
                    <div className="main_preview">
                        <div className="user_preview">
                            <p className='main_preview_title'>{dummyCard.title}</p>
                            <div className="user_preview_div">
                                <div>
                                    <p>Write By {dummyRecepi.username}</p>
                                    <p>On {`${new Date().getDate()} ${parseMonth((new Date()).getMonth())} ${new Date().getFullYear()}`}</p>
                                </div>
                                <img src={session.data?.user?.image as string} alt="user" />
                            </div>
                        </div>
                        <div className="sub_preview">
                            <div className="preview_text">
                                <div dangerouslySetInnerHTML={{ __html: dummyRecepi.recepi }} />
                            </div>
                            <div className="preview_seprator">
                            </div>
                            <div className="add_preview_images">
                                <div className="add_preview_hero">
                                    <img src={dummyCard.heroImage} alt="laddu" />
                                    <p>{dummyCard.itemName}</p>
                                </div>
                                <div className="preview_Images">
                                    {
                                        Object.entries(dummyRecepi.photos).map(photo => (
                                            <div key={photo[0]}>
                                                <img src={photo[1] as string} alt="laddu" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add_confirm">
                    <button className='cancel'>Cancel</button>
                    <button onClick={postResipe} >Post Resipe</button>
                </div>
            </div >
            :
            <>
                <Loading />
                <p style={{ textAlign: 'center' }} >{loadingText}</p>
            </>
    )
}

export default Add;
