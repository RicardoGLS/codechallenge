import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ListUsersComponent } from 'src/app/components/list-users/list-users.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ModalEditUserComponent } from 'src/app/components/modal-edit-user/modal-edit-user.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        ListUsersComponent,
        FooterComponent,
        HomeComponent,
        ModalEditUserComponent,
      ],
      imports: [
        MatIconModule,
        HttpClientModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should render the list-users component', () => {
    const listUsers = fixture.nativeElement.querySelector('app-list-users');
    expect(listUsers).toBeTruthy();
  });

  it('should render the footer component', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });
});
