import Image from "next/image";
import Link from "next/link";
import './Card.scss'

const Card: React.FC<any> = ({ data }: { data: any }) => { 
    const parseTime = (time: string): string => { 
        let hour = time.split(':')[0];
        let minutes = time.split(':')[1];
        if (parseInt(hour) == 0) {
            return minutes + ' m';
        }
        if (parseInt(minutes) == 0) {
            return hour + ' h';
        }
        return hour + ' h & ' + minutes + ' m';
    }
    return (
        <div key={data._id} className="mainCard">
            <div className="card_info">
                <div className="card_title">
                    {data.title}
                </div>
                <div className="cardFeature">
                    <div >
                        <i className="fa fa-clock-o"></i>  {parseTime(data.cookingTime)}
                    </div>
                    <div>
                        <i className='fa fa-users'></i> {data.serving} Serving
                    </div>
                </div>
                <div className="calaries">
                    {data.calories} Calories
                    <Link href={`/recepi/${data._id}`} className="goto_icon"><i className="fa fa-arrow-right"></i></Link>
                </div>
            </div>
            <div className="card_img">
                <div>
                    <img src={data.heroImage} alt={data.title} width={300} height={300} />
                </div>
            </div>
        </div>
    )
}
export default Card;