import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const mockUsers = [
      {
        id: 1,
        firstname: "John",
        lastname: "Smith",
        email: "john.smith@example.com",
        birthDate: "1980-01-23",
        address: {
          id: 1,
          street: "Lindenstraße 89",
          city: "Freiburg im Breisgau",
          country: "DE",
          postalcode: "42030"
        }
      },
      {
        id: 2,
        firstname: "John",
        lastname: "Smith",
        email: "john.smith@example.com",
        birthDate: "1980-01-23",
        address: {
          id: 2,
          street: "Lindenstraße 89",
          city: "Freiburg im Breisgau",
          country: "DE",
          postalcode: "42030"
        }
      }
    ];


    service.getAllUsers().subscribe(users => {
      expect(users).toEqual({ users: mockUsers });
    });

    const req = httpMock.expectOne(`${service['serviceUrl']}/users`);
    expect(req.request.method).toBe('GET');
    req.flush({ users: mockUsers });
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['serviceUrl']}/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a user', () => {
    const userId = 1;
    const updatedUser =  {
      id: 1,
      firstname: "John",
      lastname: "Smith",
      email: "john.smith@example.com",
      birthDate: "1980-01-23",
      street: "Lindenstraße 89",
      city: "Freiburg im Breisgau",
      country: "DE",
      postalcode: "42030"
    };

    service.updateUser(updatedUser, userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['serviceUrl']}/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush({});
  });

  it('should create a user', () => {
    const newUser =  {
      id: 1,
      firstname: "John",
      lastname: "Smith",
      email: "john.smith@example.com",
      birthDate: "1980-01-23",
      street: "Lindenstraße 89",
      city: "Freiburg im Breisgau",
      country: "DE",
      postalcode: "42030"
    };

    service.createUser(newUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['serviceUrl']}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({});
  });
});
