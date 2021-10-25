import { useHistory } from "react-router-dom"

export default function Breadcrumb() {
  const history = useHistory();
  const location = () => {
    let path = history.location.pathname;
    let myArr = path.split('/');
    let newPath = '';
    for(let i = 1; i < myArr.length; i++) {
      newPath += ` / ${myArr[i].charAt(0).toUpperCase() + myArr[i].slice(1)}`
    }
    return newPath;
  }
  return (
    <div className="header-menu-item md:xe-hidden">
      <span className="xe-mx-1"><i className='bx bx-home xe-text-sm'></i> {location()}</span>
    </div>
  )
}