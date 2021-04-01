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
    position: 'top',
    width: '90%',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  public showToast(options) {
    this.toast.fire(options);
  }
}
