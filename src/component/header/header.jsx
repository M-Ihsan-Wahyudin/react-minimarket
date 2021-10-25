import React from "react"
import { Link } from "react-router-dom";
import people from "../../assets/images/people.jpg"
import Breadcrumb from "../breadcrumb/breadcrumb";

class Header extends React.Component {

  toggleAside = () => {
    const aside = document.getElementById('aside');
    aside.classList.toggle('active');
    const asideDark = document.getElementById('aside-dark');
    asideDark.classList.toggle('active');

    document.body.classList.toggle('md:xe-overflow-hidden');
  }

  toggleSearchBar = (e) => {
    let button = e.target.closest('div').querySelector('input');
    button.classList.toggle('xe-hidden');
  }

  toggleProfilePopover = (e) => {
    
    let profile = e.target.closest('div.profile-bar').querySelector('.popover-profile');
    profile.classList.toggle('active');
  }

  render() {
    return (
      <header className="dashboard-header">
        <div className="header-menu">
          <div className="header-menu-item menu-brand">
            <div className="brand md:xe-hidden">
              <h2 className="xe-text-lg font-bold text-gray-700">Mini Market</h2>
            </div>
            <div>
              <button className="aside-button" onClick={this.toggleAside}>
                <div className="aside-toggle-icon">
                  <i className='bx bx-menu xe-text-lg xe-text-white'></i>
                </div>
              </button>
            </div>
          </div>
          <div className="header-menu-item-group">
            <Breadcrumb />
            <div className="header-menu-item menu-profile">
              <div className="header-right-side-wrapper">
                <div className="search-bar">
                  <input type="search" className="xe-hidden" placeholder="Search"/>
                  <button className="search-bar-icon" onClick={this.toggleSearchBar}>
                    <i className='bx bx-search xe-text-lg xe-text-white' ></i>
                  </button>
                </div>
                <div className="profile-bar" onClick={this.toggleProfilePopover}>
                  <img src={people} alt="profile" />
                  <div className="popover-profile">
                    <ul>
                      <li>
                        <button>
                          <i className='bx bx-user-circle' ></i>
                          <span>Profile</span>
                        </button>
                      </li>
                      <li>
                        <button>
                          <i className='bx bx-cog'></i>
                          <span>Setting</span>
                        </button>
                      </li>
                      <li>
                        <Link to="/">
                          <button className="logout">
                            <i className='bx bx-log-out'></i>
                            <span>Logout</span>
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;