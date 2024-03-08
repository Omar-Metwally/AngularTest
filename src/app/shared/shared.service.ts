import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/modals/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from './popup/popup.component';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
    private snackBar: MatSnackBar) { }

  showSnackBar(message: string){
    this.snackBar.open(message, "Close");
  }
  showPopUp(type: string, message: string){
    const initialState: ModalOptions = {
      initialState: {
        type,
        message
      },
      backdrop: 'static',
      keyboard: true,
      focus: false
    };

    this.bsModalRef = this.modalService.show(PopupComponent, initialState);
  }

  showNotification(isSuccess: boolean, title: string, message: string) {
    const initialState: ModalOptions = {
      initialState: {
        isSuccess,
        title,
        message
      }
    };

    this.bsModalRef = this.modalService.show(NotificationComponent, initialState);
  }
}
