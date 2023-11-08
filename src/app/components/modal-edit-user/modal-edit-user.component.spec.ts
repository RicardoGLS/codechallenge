import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditUserComponent } from './modal-edit-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';

describe('ModalEditUserComponent', () => {
  let component: ModalEditUserComponent;
  let fixture: ComponentFixture<ModalEditUserComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditUserComponent],
      imports: [
        HttpClientModule,
      ],
      providers: [UsersService]
    });
    fixture = TestBed.createComponent(ModalEditUserComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCloseModal when closeForm is called', () => {
    spyOn(component.onCloseModal, 'emit');
    component.closeForm();
    expect(component.onCloseModal.emit).toHaveBeenCalled();
  });


  it('should call createUser on UsersService when saveInformation is called without a user', () => {
    spyOn(usersService, 'createUser').and.returnValue(of({user: {id: 1, firstname: 'John', lastname: 'Doe', email: 'johndoe@example.com', birthDate: '1990-01-01', address: {street: '123 Main St', city: 'Anytown', country: 'USA', postalcode: '12345'}}}));
    component.saveInformation();
    expect(usersService.createUser).toHaveBeenCalled();
  });

  it('should call updateUser on UsersService when saveInformation is called with a user', () => {
    spyOn(usersService, 'updateUser').and.returnValue(of({user: {id: 1, firstname: 'John', lastname: 'Doe', email: 'johndoe@example.com', birthDate: '1990-01-01', address: {street: '123 Main St', city: 'Anytown', country: 'USA', postalcode: '12345'}}}));
    component.user = {id: 1, firstname: 'John', lastname: 'Doe', email: 'johndoe@example.com', birthDate: '1990-01-01', address: {id: 1, street: '123 Main St', city: 'Anytown', country: 'USA', postalcode: '12345'}};
    component.saveInformation();
    expect(usersService.updateUser).toHaveBeenCalled();
  });

  it('should call closeFuntion when closingModal is called', () => {
    spyOn(component.closeFuntion, 'emit');
    component.closingModal();
    expect(component.closeFuntion.emit).toHaveBeenCalled();
  });
});
