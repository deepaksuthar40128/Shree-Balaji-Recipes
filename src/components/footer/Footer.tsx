import './Footer.scss'
const Footer: React.FunctionComponent = () => {
    return (
        <footer className="footer-distributed">

            <div className="footer-left">

                <h3>Shree Balaji <span>Recepi</span></h3>

                

                <p className="footer-company-name">Shree Balaji Sweets © 2015</p>
            </div>

            <div className="footer-center">

                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>Mandir Street</span> Salasar,Churu,Rajsthan</p>
                </div>

                <div>
                    <i className="fa fa-phone"></i>
                    <p>+91-9580613733</p>
                </div>

                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@company.com">support@balaji.com</a></p>
                </div>

            </div>

            <div className="footer-right">

                <p className="footer-company-about">
                    <span>About the company</span>
                    Jai Shree Balaji Salasar Dham Best Desi Ghree Sweets Order pr tyar ki jaati h, SwaMani ke liye Sampark Kre.
                      </p>
 

            </div>

        </footer>

    );
}

export default Footer;
