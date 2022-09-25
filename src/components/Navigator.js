import { React } from 'react';
import { Link, useLocation } from 'react-router-dom';

let currentPath = '';

function Navigator() {
  let location = useLocation();

  const onClick = () => {
    if (currentPath === location.pathname) window.location.reload();

    currentPath = location.pathname;
  };
  return (
    <div className="nav">
      <Link to="/">
        <i onClick={onClick} className="fa-solid fa-film"></i>
      </Link>
      <Link to="/mypage">
        <i onClick={onClick} className="fa-solid fa-user"></i>
      </Link>
    </div>
  );
}

export default Navigator;
