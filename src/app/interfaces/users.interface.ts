/**
 * Interfaz que representa una dirección.
 */
export interface Address {
    id: number;         // Identificador único para la dirección.
    street: string;     // Nombre de la calle.
    city: string;       // Nombre de la ciudad.
    country: string;    // Nombre del país.
    postalcode: string; // Código postal.
  }
  
  /**
   * Interfaz que representa un usuario.
   */
  export interface User {
    id: number;           // Identificador único para el usuario.
    firstname: string;    // Primer nombre del usuario.
    lastname: string;     // Apellido del usuario.
    email: string;        // Dirección de correo electrónico del usuario.
    birthDate: string;    // Fecha de nacimiento del usuario (puede requerir un formato específico).
    address: Address;     // Objeto que contiene la dirección del usuario.
  }
  
  /**
   * Interfaz que representa la respuesta de una lista de usuarios.
   */
  export interface UserListResponse {
    users: User[];  // Lista de usuarios.
  }
  
  /**
   * Interfaz que representa un modelo de formulario de usuario.
   */
  export interface UserFormModel {
    firstname: string,  // Primer nombre del usuario.
    lastname: string,   // Apellido del usuario.
    email: string,      // Dirección de correo electrónico del usuario.
    birthDate: string,  // Fecha de nacimiento del usuario (puede requerir un formato específico).
    street: string,     // Nombre de la calle de la dirección del usuario.
    city: string,       // Nombre de la ciudad de la dirección del usuario.
    country: string,    // Nombre del país de la dirección del usuario.
    postalcode: string, // Código postal de la dirección del usuario.
  }