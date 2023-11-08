import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


/**
 * Components
 */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalEditUserComponent } from './components/modal-edit-user/modal-edit-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

/**
 * Services
 */
import { UsersService } from './services/users.service';

/**
 * Material imports
 */
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ListUsersComponent,
    ModalEditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [UsersService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
