import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {

  toggleAside = () => {
    const aside = document.getElementById('aside');
    aside.classList.toggle('active');
    const asideDark = document.getElementById('aside-dark');
    asideDark.classList.toggle('active');

    document.body.classList.toggle('md:xe-overflow-hidden');
  }

  menuDropdownToggle = (e) => {
    e.preventDefault();
    e.target.closest('div.menu-dropdown-group').classList.toggle('active')
  }

  render() {
    return (
      <Fragment>
        <aside className="aside-container text-gray-700 active" id="aside">
          <div className="aside-brand">
            <h2 className="xe-text-lg">Mini Market</h2>
          </div>
          <div className="menu-list">

            <div className="menu-group">
              <div className="menu-group-title">
                <h3>Dashboard</h3>
              </div>
              <NavLink to="/dashboard" className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-line-chart xe-text-md' ></i>
                </div>
                <div className="menu-title">
                  Statistics
                </div>
              </NavLink>
            </div>

            <div className="menu-group">
              <div className="menu-group-title">
                <h3>Transaction</h3>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bxl-paypal xe-text-md' ></i>
                </div>
                <div className="menu-title">
                  Payment
                </div>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-transfer-alt xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Refund
                </div>
              </div>
              <NavLink to="/pembelian" className="menu-item">
                <div className="menu-icon">
                  <i className='bx bxs-credit-card xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Pembelian Stok
                </div>
              </NavLink>
            </div>

            <div className="menu-group">
              <div className="menu-group-title">
                <h3>Data</h3>
              </div>
              {/* <div className="menu-dropdown-group active">
                <NavLink to="/product" className="menu-item-parent" onClick={this.menuDropdownToggle}>
                  <div className="menu-icon">
                    <i className='bx bx-cube xe-text-md'></i>
                  </div>
                  <div className="menu-title">
                    Product
                  </div>
                  <i className='bx bx-chevron-down arrow-down-icon'></i>
                </NavLink>
                <div className="menu-dropdown-child">
                  <NavLink to="/product/list" className="menu-item-child">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      List Product
                    </div>
                  </NavLink>
                  <NavLink to="/product/new" className="menu-item-child">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      New Product
                    </div>
                  </NavLink>
                  <NavLink to="/product/category" className="menu-item-child">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      Category
                    </div>
                  </NavLink>
                </div>
              </div> */}
              <NavLink to="/pemasok" className="menu-item">
                <div className="menu-icon">
                  <i className='bx bxs-briefcase-alt-2 xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Pemasok
                </div>
              </NavLink>
              <NavLink to="/barang" className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-cube xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Barang
                </div>
              </NavLink>
              <NavLink to="/kategori" className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-cube xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Kategori Barang
                </div>
              </NavLink>
            </div>
            
            <div className="menu-card">
              <div className="card-title"><strong>Free Template</strong></div>
              <div className="card-body">
                <button className="card-button xe-my-1">Docs</button>
              </div>
            </div>
          </div>
        </aside>
        <div className="aside-dark lg:xe-hidden" onClick={this.toggleAside} id="aside-dark"></div>
      </Fragment>
    )
  }
}

export default Sidebar;