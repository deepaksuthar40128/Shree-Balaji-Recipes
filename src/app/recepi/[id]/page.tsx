import { notFound } from "next/navigation";
import '@/app/add/add.scss'
import './page.scss'
import { Metadata } from "next";
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const id = params.id

    const product = await fetch(process.env.URL + `/api/recepi/${id}`).then((res) => res.json())

    return {
        title: product.title,
        description: product.recepi,
        openGraph: {
            type: "website",
            url: `https://shree-balaji-recipes.vercel.app/recepi/${id}`,
            title: "Shree Balaji Recipes",
            description: product.recepi,
            siteName: "Shree Balaji Recipes",
            images: [{
                url: product.heroImage,
            }],
        },
    }
}
export const dynamic = 'force-dynamic';
const getData = async (id: string) => {
    const res = await fetch(process.env.URL + `/api/recepi/${id}`);
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
    const jsonLd = {
        '@context': 'https://shree-balaji-recepies.vercel.app',
        '@type': 'Recepi',
        ...data
    }
    return (
        <div className="main_add">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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