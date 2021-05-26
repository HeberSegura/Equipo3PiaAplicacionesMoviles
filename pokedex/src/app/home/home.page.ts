import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
 
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
 
  constructor(private pokeService: PokemonService, private camera: Camera) { }
 
  ngOnInit()  {
    this.loadPokemon();
  }
 
  //Lógica utilizada para cargar pokemones y pedirselos a la API
  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }
 
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];
 
      if (event) {
        event.target.complete();
      }
    });
  }
 
  //Lógica utilizada para poder buscar cada que cambie la barra de búsqueda
  onSearchChange(e) {
    let value = e.detail.value;
 
    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }
 
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

}