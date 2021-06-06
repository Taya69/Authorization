import { Injectable } from '@angular/core';
import { Users } from '../mock-users';
import { Observable, of, from } from 'rxjs';
import { User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  findUser (login: string): Observable<User> {
    const userSearch =  Users.find((user)=> user.name === login)!    
    return of(userSearch);    
  }
  findUserById (id: number): Observable<User> {
    const userSearch =  Users.find((user)=> user.id == id)!     
    return of(userSearch);    
  }
  addUser(user: User) {
    Users.push(user);    
  }
  getUsers() :Observable<User[]> {
    return of(Users)
  }
  getLastId() :Observable<number> {
    const id = Users[Users.length - 1].id
    return of(id)
  }
  deleteUser(id: number) {
    const userSearch =  Users.find((user)=> user.id === id)!;
    const index = Users.indexOf(userSearch);
    Users.splice(index, 1);        
  }
  editUser(user1: User) {
    const userSearch =  Users.find((user) => user.id === user1.id)!;
  //  console.log(userSearch, user1)
    const index = Users.indexOf(userSearch);
    Users.splice(index, 1, user1); 
  //  console.log(Users)      
  }
  testNameOfUser (name : string) : boolean {
    let searchName = Users.find((user)=> user.name.toUpperCase() === name.toUpperCase())
    
    if (searchName !== undefined) {      
      return true
    } else {      
      return false
    }
    
  }
  constructor() { }
}
