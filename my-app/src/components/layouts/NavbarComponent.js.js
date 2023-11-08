import logo from './../../image/logo.jpg';

const NavbarComponent = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-image">
        <img src={logo} alt="" />
      </div>
      <div className="nav-content">
        <div className="nav-main-content">ระบบจ่ายยาอัจฉริยะ</div>
        <div className="nav-sub-content">ห้องพยาบาล โรงเรียนหางดงรัฐราษฎร์อุปถัมภ์</div>
      </div>
    </nav>
  );
};

export default NavbarComponent;