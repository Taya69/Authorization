import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetUserService } from 'src/app/get-user.service';
import { User } from 'src/user';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-office',
  templateUrl: './user-office.component.html',
  styleUrls: ['./user-office.component.css']
})
export class UserOfficeComponent implements OnInit {  
  @ViewChild('inputForFile')
  inputForFileRef!: ElementRef;
  
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  user1: any;
  edit: boolean = true;
  file!: File;
  imagePreview: any;
  nameOfUploadFile: string = ''
  constructor( private userService: GetUserService, private location: Location, private fb: FormBuilder,
   private http: HttpClient ) { }
 
  loginForm: FormGroup = this.fb.group({})
  ngOnInit(): void {    
    const id = Number(localStorage.getItem('id')); 
    this.userService.findUserById(id).subscribe((user) => {this.user1 = user; this.firstName = user.firstName
    this.lastName = user.lastName})     
  }
  getSrc (): string {    
    const src = `/assets/users/user${Number(localStorage.getItem('id'))}.jpg`    
    return src
  }
  getUsername () {
    return this.user1.name
  }
  goBack () {
    this.location.back();
  }
  save () {
   if (!this.edit) { return}
    this.userService.editUser({
      name: this.user1.name,
      id: this.user1.id,
      password: this.user1.password,
      code: this.user1.code,
      firstName: this.firstName,
      lastName: this.lastName
    })  
  } 
  triggerOfUpload() {
    this.inputForFileRef.nativeElement.click()
  } 
  onFileUpload (event : any) {
    const file = event.target.files[0];
    this.file = file;
    const reader = new FileReader()
    reader.onload = () => {
      console.log(555555555)
     // console.log(reader.result)
      this.imagePreview = reader.result
      // var blob = new Blob([], {type: "text/plain"})
      // var link = document.createElement("a")
      // link.setAttribute("href", URL.createObjectURL(blob))
      // link.setAttribute("download", "my-text.txt")
      // link.click()
    }
   // console.log(file.name)
    reader.readAsDataURL(file)
   
    // ццthis.nameOfUploadFile = file.name
  } 
  load () {
    // создаём <canvas> того же размера
    let img = document.querySelector('img')!;
    console.log(img)
    let canvas = document.createElement('canvas');
    canvas.width = img.clientWidth;
    //canvas.height = img.clientHeight;
    
    let context = canvas.getContext('2d');
    
    // копируем изображение в  canvas (метод позволяет вырезать часть изображения)
    context!.drawImage(img, 0, 0);
    // мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований
    
    // toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
    canvas.toBlob(function(blob) {
      console.log(blob)
      // после того, как Blob создан, загружаем его
      let link = document.createElement('a');
      link.download = 'example.png';
    
      link.href = URL.createObjectURL(blob);
      link.click();
    
      // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  }
  OnUploadFile() {
    //Upload file here send a binary data
    this.http.post('./', this.file)
    .subscribe();
    }
}
