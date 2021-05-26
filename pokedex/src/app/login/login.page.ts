import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logs = [];

  constructor(private dbService: DatabaseService, private router: Router, private alertCtrl: AlertController) { }

  //Al inicializar se cargan los datos de la base de datos
  ngOnInit() {
    this.dbService.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.loadLogs();
      }
    })
  }

  loadLogs(){
    this.dbService.getLogs().then(data => {
      this.logs = data;
    })
  }

  async giveAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Wrong username or password',
      subHeader: 'Try again',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //El form para verificar los datos ingresados
  login(form){
    for(var i in this.logs){
      if(form.value.user == this.logs[i].user && form.value.pwd == this.logs[i].pwd){
        this.router.navigateByUrl('home');
        return;
      }
      this.giveAlert;
    }
  }

}
