import '../card/Card.scss'
import './page.scss'
import Link from "next/link";
const loadCard = () => {
    return (
        <div className="mainCard ">
            <div className="card_info ">
                <div className="card_title">
                </div>
                <div className="cardFeature">
                    <div  >
                    </div>
                    <div>
                    </div>
                </div>
                <div className="calaries">

                </div>
            </div>
            <div className="card_img">
                <div className='animated-background'>
                    {/* <div className="background-masker"></div> */}
                </div>
            </div>
        </div>
    )
}

export default loadCard;