import React, { Fragment } from "react";

class Sidebar extends React.Component {
  toggleAside = () => {
    const aside = document.getElementById('aside');
    aside.classList.toggle('active');
    const asideDark = document.getElementById('aside-dark');
    asideDark.classList.toggle('active');

    document.body.classList.toggle('md:xe-overflow-hidden');
  }

  menuDropdownToggle = (e) => {
    e.target.closest('div.menu-dropdown-group').classList.toggle('active')
  }
  
  render() {
    return (
      <Fragment>
        <aside className="aside-container active" id="aside">
          <div className="aside-brand">
            <h2 className="xe-text-lg">Mini Market</h2>
          </div>
          <div className="menu-list">
            <div className="menu-group">
              <div className="menu-group-title">
                <h3>Dashboard</h3>
              </div>
              <div className="menu-dropdown-group active">
                <div className="menu-item-parent active" onClick={this.menuDropdownToggle}>
                  <div className="menu-icon">
                    <i className='bx bx-home xe-text-md'></i>
                  </div>
                  <div className="menu-title">
                    Home
                  </div>
                  <i className='bx bx-chevron-down arrow-down-icon'></i>
                </div>
                <div className="menu-dropdown-child">
                  <div className="menu-item-child active">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      About US
                    </div>
                  </div>
                  <div className="menu-item-child">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      Hoho
                    </div>
                  </div>
                  <div className="menu-item-child">
                    <div className="menu-icon">
                      <span className="xe-text-sm">&#9679;</span>
                    </div>
                    <div className="menu-title">
                      Tolol
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-trending-up xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Statistic
                </div>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-doughnut-chart xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Diagram
                </div>
              </div>
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
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bxs-credit-card xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Purchase
                </div>
              </div>
            </div>

            <div className="menu-group">
              <div className="menu-group-title">
                <h3>Product</h3>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-list-check xe-text-md'></i>
                </div>
                <div className="menu-title">
                  List Product
                </div>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-list-plus xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Add Product
                </div>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <i className='bx bx-edit xe-text-md'></i>
                </div>
                <div className="menu-title">
                  Edit Product
                </div>
              </div>
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