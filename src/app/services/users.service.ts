import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListResponse, UserFormModel } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // Web service base url
  private serviceUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  /**
   * Get all users
   * @description Obtiene la lista de usuarios
   * @returns Devuelve un observable con los datos del servicio
   */
  getAllUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.serviceUrl}/users`);
  };

  /**
   * Delete user
   * @param userId Id del usuario a eliminar
   * @returns Devuelve un observable con los datos del servicio
   */
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.serviceUrl}/users/${userId}`);
  }

  /**
   * Update user
   * @param user Datos del usuario a actualizar
   * @param id Id del usuario a actualizar
   * @returns Devuelve un observable con los datos del servicio
   */
  updateUser(user: UserFormModel, id: number): Observable<any> {
    return this.http.put<any>(`${this.serviceUrl}/users/${id}`, user);
  }

  /**
   * Create user
   * @param user Datos del usuario a crear
   * @returns Devuelve un observable con los datos del servicio
   */
  createUser(user: UserFormModel): Observable<any> {
    return this.http.post<any>(`${this.serviceUrl}/users`, user);
  }
}
