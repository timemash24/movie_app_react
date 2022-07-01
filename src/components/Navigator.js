import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigator.module.css';

function Navigator() {
  return (
    <div className={styles.home}>
      <Link to="/">
        <i className="fa-solid fa-film"></i>
      </Link>
    </div>
  );
}

export default Navigator;
