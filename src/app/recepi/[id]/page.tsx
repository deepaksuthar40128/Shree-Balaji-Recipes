import { notFound } from "next/navigation";
import '@/app/add/add.scss'
import './page.scss'

const getData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/recepi/${id}`, {
        cache: "no-cache"
    });
    if (res) {
        return await res.json();
    } else {
        return notFound();
    }
}
const parseMonth = (num: number): string => {
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return month[num];
}
const recepi: React.FunctionComponent<any> = async ({ params }: { params: any }): Promise<any> => {
    const data = await getData(params.id);
    return (
        <div className="main_add">
            <div className="add_preview">
                <div className="main_preview">
                    <div className="user_preview">
                        <p className='main_preview_title'>{data.title}</p>
                        <div className="user_preview_div">
                            <div>
                                <p>Write By {data.userId.username}</p>
                                <p>On {`${new Date(data.createdAt).getDate()} ${parseMonth((new Date(data.createdAt)).getMonth())} ${new Date(data.createdAt).getFullYear()}`}</p>
                            </div>
                            <img src={data.userId.profile} alt="user" />
                        </div>
                    </div>
                    <div className="sub_preview">
                        <div className="preview_text">
                            <div dangerouslySetInnerHTML={{ __html: data.recepi }} />
                        </div>
                        <div className="preview_seprator">
                        </div>
                        <div className="add_preview_images">
                            <div className="add_preview_hero">
                                <img src={data.heroImage} alt="laddu" />
                                <p>{data.itemName}</p>
                            </div>
                            <div className="preview_Images">
                                {
                                    data.photos.map((photo: string, key: number) => (
                                        <div key={key}>
                                            <img src={photo as string} alt="laddu" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default recepi;