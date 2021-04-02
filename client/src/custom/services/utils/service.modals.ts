import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ServiceModals {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    width: '66%',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  confirmation = Swal.mixin({
    showCancelButton: true,
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

  public confirm(options) {
    return this.confirmation.fire(options);
  }

  public showToast(options) {    
    this.toastr[`${options.status}`](options.title, options.statusMessage, {
      timeOut: 2000
    });
  }

  public showLoading(options) {
    this.loading.fire(options);
  }
  
  public hideLoading() {
    Swal.hideLoading();
    Swal.close();
  }
}
