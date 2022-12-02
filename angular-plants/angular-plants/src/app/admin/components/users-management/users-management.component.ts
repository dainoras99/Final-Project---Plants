import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  removeUser(userId: number) {
    this.usersService.removeUser(userId).subscribe(
      {
        next: response => {
          this.loadUsers();
          alert(response);
        },
        error: err => {
          alert(err);
        }
      }
    )
  }

  changeRole(userId: number, roleChange: boolean) {
    this.usersService.changeRole(userId, roleChange).subscribe(
      {
        next: response => {
          this.loadUsers();
          alert(response);
        },
        error: err => {
          alert(err);
        }
      }
    )
  }
}
