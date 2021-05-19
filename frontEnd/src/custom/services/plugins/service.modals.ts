import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ServiceModals {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

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

  public confirm(options: any): any {
    return this.confirmation.fire(options);
  }

  public showToast(options: any): any {
    (this.toastr as any)[`${options.status}`](options.title, options.statusMessage, {
      timeOut: 2000
    });
  }

  public showLoading(options: any): any {
    this.loading.fire(options);
  }

  public hideLoading(): any {
    Swal.hideLoading();
    Swal.close();
  }
}
