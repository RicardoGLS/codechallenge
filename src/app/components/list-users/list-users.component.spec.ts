import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersComponent, ModalEditUserComponent],
      imports: [FormsModule, MatIconModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should emit edit event when edit button is clicked', () => {
    spyOn(component, 'edit');
    component.users = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        birthDate: '1990-01-01',
        address: {
          id: 1,
          street: 'Lindenstraße 89',
          country: 'USA',
          city: 'New York',
          postalcode: '10001',
        },
      },
    ];
    fixture.detectChanges();
    const editButton = fixture.debugElement.query(By.css('.styles-bottons:first-child')).nativeElement;
    editButton.click();
    expect(component.edit).toHaveBeenCalledWith(component.users[0]);
  });

  it('should emit remove event when remove button is clicked', () => {
    spyOn(component, 'remove');
    component.users = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        birthDate: '1990-01-01',
        address: {
          id: 1,
          street: 'Lindenstraße 89',
          country: 'USA',
          city: 'New York',
          postalcode: '10001',
        },
      },
    ];
    fixture.detectChanges();
    const removeButton = fixture.debugElement.query(By.css('.styles-bottons:last-child')).nativeElement;
    removeButton.click();
    expect(component.remove).toHaveBeenCalledWith(component.users[0]);
  });

  it('should emit createUser event when create user button is clicked', () => {
    spyOn(component, 'createUser');
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('.styles-bottons:last-child')).nativeElement;
    createButton.click();
    expect(component.createUser).toHaveBeenCalled();
  });
});
