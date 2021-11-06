import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const userData = useSelector(state => state.userData.data);

  const toggleAside = () => {
    const aside = document.getElementById('aside');
    aside.classList.toggle('active');
    const asideDark = document.getElementById('aside-dark');
    asideDark.classList.toggle('active');

    document.body.classList.toggle('md:xe-overflow-hidden');
  }

  // const menuDropdownToggle = (e) => {
  //   e.preventDefault();
  //   e.target.closest('div.menu-dropdown-group').classList.toggle('active')
  // }

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
            <NavLink to="/home" className="menu-item">
              <div className="menu-icon">
                <i className='bx bx-home xe-text-md' ></i>
              </div>
              <div className="menu-title">
                Home
              </div>
            </NavLink>
            {
              userData.level === 'Administrator' ?
                <NavLink to="/dashboard" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bx-line-chart xe-text-md' ></i>
                  </div>
                  <div className="menu-title">
                    Statistics
                  </div>
                </NavLink>
              : 
                ''
            }
          </div>

          {
            userData.level === "Operator" ?
              <div className="menu-group">
                <div className="menu-group-title">
                  <h3>Transaction</h3>
                </div>
                <NavLink to="/penjualan" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bx-cart-alt xe-text-md' ></i>
                  </div>
                  <div className="menu-title">
                    Penjualan Barang
                  </div>
                </NavLink>
                <NavLink to="/pembelian" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bxs-credit-card xe-text-md'></i>
                  </div>
                  <div className="menu-title">
                    Pembelian Stok
                  </div>
                </NavLink>
              </div>
            :
              ''
          }

          <div className="menu-group">
            {
              userData.level === 'Administrator' || userData.level === 'Entry Data Processing' ?
                <div className="menu-group-title">
                  <h3>Data</h3>
                </div>
              :
                ''
            }
            {
              userData.level === 'Entry Data Processing' ?
                <Fragment>
                  <NavLink to="/pemasok" className="menu-item">
                    <div className="menu-icon">
                      <i className='bx bx-window-open xe-text-md'></i>
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
                      <i className='bx bx-purchase-tag xe-text-md'></i>
                    </div>
                    <div className="menu-title">
                      Kategori Barang
                    </div>
                  </NavLink>
                  <NavLink to="/pelanggan" className="menu-item">
                    <div className="menu-icon">
                      <i className='bx bx-id-card xe-text-md'></i>
                    </div>
                    <div className="menu-title">
                      Pelanggan
                    </div>
                  </NavLink>
                </Fragment>
              :
                ''
            }
            {
              userData.level === 'Administrator' ?
                <NavLink to="/karyawan" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bxs-group xe-text-md'></i>
                  </div>
                  <div className="menu-title">
                    Karyawan
                  </div>
                </NavLink>
              : 
                ''
            }
          </div>

          {
            userData.level === 'Administrator' ?
              <div className="menu-group">
                <div className="menu-group-title">
                  <h3>Report</h3>
                </div>
                <NavLink to="/laporan/penjualan" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bxs-report xe-text-md' ></i>
                  </div>
                  <div className="menu-title">
                    Penjualan
                  </div>
                </NavLink>
                <NavLink to="/laporan/pembelian" className="menu-item">
                  <div className="menu-icon">
                    <i className='bx bxs-credit-card xe-text-md'></i>
                  </div>
                  <div className="menu-title">
                    Pembelian
                  </div>
                </NavLink>
              </div>
            :
              ''
          }
          
          <div className="menu-card">
            <div className="card-title"><strong>Free Template</strong></div>
            <div className="card-body">
              <button className="card-button xe-my-1">Docs</button>
            </div>
          </div>
        </div>
      </aside>
      <div className="aside-dark lg:xe-hidden" onClick={toggleAside} id="aside-dark"></div>
    </Fragment>
  )
}