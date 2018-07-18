import { UsersService } from './../../services/users.service';
import { SharedService } from './../../services/shared.service';
import { User } from './../../model/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseAPI } from '../../model/response.api';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  
  @ViewChild("form")
  form: NgForm

  user = new User('','','','');
  shared : SharedService;
  message: {};
  classCss: {};

  constructor(
    private userService: UsersService,
    private route = ActivatedRoute
  ) { 
    this.shared = SharedService.getinstance();
  }


  ngOnInit() {
    //let id:string = this.route.params['id'];
    //if(id != undefined){
    //  this.findById(id);
    //}
  }

  findById(id:string){
    this.userService.finndById(id).subscribe((responseAPI: ResponseAPI) => {
      this.user =responseAPI.data;
      this.user.password = '';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register(){
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((responseApi:ResponseAPI) => {
        this.user = new User(null,'','','');
        let userRet : User = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${userRet.email} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}):void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined
    }, 3000)
  }

  private buildClasses(type: string): void{
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+ type] = true;
  }
  
  getFromGroupClass(isInvalid: boolean,  isDirty): {}{
    return {
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    }
  }

}
