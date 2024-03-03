import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  constructor (public bsModalRef: BsModalRef) {}

  
    type =  ''
    message = ''


  close(alert: string) {
		alert
	}

}
