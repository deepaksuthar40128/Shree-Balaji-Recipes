const authLayout: any = ({ children, }: { children: React.ReactNode }) => {
    return (
        <div> 
            <div className="main_login">
                <div className="session">
                    <div className="left">
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default authLayout;

// const tryfn = ({ a, b }: { a: number, b: number }) => {
//     return a + b;
// }