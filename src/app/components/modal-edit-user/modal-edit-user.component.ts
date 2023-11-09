// Importaciones necesarias
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserFormModel } from 'src/app/interfaces/users.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.scss']
})
export class ModalEditUserComponent {
  // Propiedades de entrada
  @Input() user?: User;
  @Input() isOpen: boolean = false;

  // Eventos de salida
  @Output() onCloseModal  = new EventEmitter<User>(); // Al cerrar el modal
  @Output() onSaveUser  = new EventEmitter<User>(); // Al guardar la información

  // Variables del formulario
  firstName : string = "";
  lastName : string = "";
  email : string = "";
  birthDate: string = "";
  street: string = "";
  city: string = "";
  country: string = "";
  postalCode: string = "";

  // Constructor
  constructor(
    private usersService: UsersService,
  ){}

  // Método que se ejecuta cuando hay cambios en las propiedades de entrada
  ngOnChanges(){
    if(this.user){
      // Asignar los valores del usuario a las variables del formulario
      this.firstName = this.user.firstname;
      this.lastName = this.user.lastname;
      this.email = this.user.email;
      this.birthDate = this.user.birthDate;
      this.street = this.user.address.street;
      this.city = this.user.address.city;
      this.country = this.user.address.country;
      this.postalCode = this.user.address.postalcode;
    } else {
      // Limpiar la información cuando se quiere crear un nuevo usuario
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.birthDate = "";
      this.street = "";
      this.city = "";
      this.country = "";
      this.postalCode = "";
    }
  }

 
  // Método para guardar la información del formulario
  saveInformation(): void{
    if(!this.user){
      // Si no hay usuario, crear uno nuevo
      const user: UserFormModel = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        birthDate: this.birthDate,
        street: this.street,
        city: this.city,
        country: this.country,
        postalcode: this.postalCode,
      }
      
      // Llamar al servicio para crear el usuario
      this.usersService.createUser(user).subscribe((data)=>{
        if(data.user){
          this.onSaveUser.emit(data.user);
        }
      }, (error) => {
        console.log('error durante la creación');
      })

      return;
    }

    // Si hay usuario, actualizarlo
    const user: UserFormModel = {
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      country: this.country,
      postalcode: this.postalCode,
    }
    
    // Llamar al servicio para actualizar el usuario
    this.usersService.updateUser(user, this.user.id).subscribe((data)=>{
      if(data.user){
        this.onSaveUser.emit(data.user);
      }
    }, (error) => {
      console.log('error durante la creación');
    })
  };

  // Método para cerrar la función
  closingModal(){
    this.onCloseModal.emit(this.user)
  };
}