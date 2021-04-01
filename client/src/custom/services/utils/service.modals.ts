import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ServiceModals {
  constructor(private http: HttpClient) {}

  toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    width: '66%',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  loading = Swal.mixin({
    customClass: {
      actions: 'loader-center',
    },
    allowOutsideClick: false,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  public showToast(options) {
    this.toast.fire(options);
  }

  public showLoading(options) {
    this.loading.fire(options);
  }
  
  public hideLoading() {
    Swal.close();
    Swal.hideLoading();
  }
}
