import { Link } from 'react-router-dom'

import classes from './css/NavBar.module.css'

function NavBar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <Link to="/">
          <div className={classes.logo}>
            NoobCode
          </div>
        </Link>
        
        <ul>
          <li>
            <Link to="/stats">
              <div className={classes.navlink}>
                Statistics
              </div>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <div className={classes.navlink}>
                About
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    // <nav className={classes.navbar}>
    //   <ul>
    //     <li> 
    //       <Link to="/" className={classes.navLink} >
    //         NoobCode 
    //       </Link> 
    //     </li>
    //     <li> 
    //       <Link to="/stats" className={classes.navLink}>
    //         Statistics 
    //       </Link> 
    //     </li>
    //     <li> 
    //       <Link to="/about" className={classes.navLink}>
    //         About 
    //       </Link> 
    //     </li>
    //   </ul>
    // </nav>
  )
}

export default NavBar