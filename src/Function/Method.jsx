import Swal from "sweetalert2";

class Method {
  formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  phoneNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");
  }

  searchData(e, table) {
    let input, filter, tr, td, i, txtValue;
    input = e.target;
    filter = input.value.toUpperCase();
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today
  }

  showToast(message, icon) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  showAlert(title, message, icon) {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonText: 'Kembali'
    })
  }
}

export default new Method();