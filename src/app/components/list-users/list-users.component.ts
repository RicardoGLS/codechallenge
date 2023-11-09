import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  // Used for show modal
  openModalEdit = false;

  // List users
  users?: User[];

  // User selected for edit
  userSelect?: User;

  constructor(
    private usersService: UsersService,
  ) {
    // Get all users from webservice
    this.usersService.getAllUsers().subscribe((data) => {
      console.log('infoServer', data.users);
      this.users = data.users;
    });
  }

  /**
   * Eliminar usuario
   * @param user usuario a eliminar
   */
  remove(user: User) {
    this.usersService.deleteUser(user.id).subscribe(() => {
      this.users = this.users?.filter(u => u.id !== user.id);
    });
  }

  /**
   * Editar usuario con la modal
   * @param user usuario a editar
   */
  edit(user: User) {
    this.userSelect = user;
    this.openModalEdit = true;
  }

  /**
   * On close modal
   */
  onCloseModal() {
    this.openModalEdit = false;
  }

  /**
   * On save modal
   */
  saveUser(user: User): void {
    const existingUserIndex = this.users?.findIndex(u => u.id === user.id);
    if (existingUserIndex !== -1 && this.users && existingUserIndex) {
      this.users[existingUserIndex] = user;
    } else {
      this.users?.push(user);
    }

    // Close modal
    this.onCloseModal();
  }

  /**
   * Create user using modal
   * Only show modal
   */
  createUser() {
    //Removemos el usuario anteriormente seleccionado
    if(this.userSelect) this.userSelect = undefined;
    this.openModalEdit = true;
  }
}
