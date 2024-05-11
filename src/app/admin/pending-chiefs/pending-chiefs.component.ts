import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetWaitingUserList } from 'src/app/api/models';
import { AdminService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminUpdateUserStatusPatch$Params } from 'src/app/api/fn/admin/admin-update-user-status-patch';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-pending-chiefs',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './pending-chiefs.component.html',
  styleUrl: './pending-chiefs.component.css'
})
export class PendingChiefsComponent {

  waitingUserList: GetWaitingUserList[] = []
  constructor(private adminService: AdminService,
    private sharedService: SharedService){
    this.adminService.adminGetWaitingUserListGet().subscribe({
      next: (response) => {
        this.waitingUserList = response
      },
      error: (error) => {
      }
    });
  }

  acceptUser(user: GetWaitingUserList){
    const request: AdminUpdateUserStatusPatch$Params = {
      UserID: user.userID ?? '',
      IsEnabled: true
    };
    this.adminService.adminUpdateUserStatusPatch(request).subscribe({
      next: (response) => {
        this.sharedService.showPopUp('success','user updated')
        this.removeFromOrderArray(this.waitingUserList, user)
      },
      error: (error) => {
        this.sharedService.showPopUp('danger','error, please refresh your page')
      }
    });
  }
  private removeFromOrderArray(array: any[], user: any): void {
    const index = array.findIndex(item => item === user);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
