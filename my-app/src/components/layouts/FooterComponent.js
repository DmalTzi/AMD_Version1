const FooterComponent =()=>{
    return(
        <footer className="bg-dark text-center text-white w-100" style={{position:"absolute", bottom:"0",height:"2.5rem"}}>
            <div className="text-center p-3 pb-5" style={{backgroundColor: "rgb(255, 240, 240)", color: "black"}}>
                © 2023 Copyright
                {/* <!-- <a class="text-white" href="#">MDBootstrap.com</a> --> */}
            </div>
        </footer>
    )
}

export default FooterComponent