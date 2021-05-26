import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-abi-details',
  templateUrl: './abi-details.page.html',
  styleUrls: ['./abi-details.page.scss'],
})
export class AbiDetailsPage implements OnInit {
  details: any;
 
  constructor(private pokeService: PokemonService, private route: ActivatedRoute) { }
  
  //Se toma el índice que tiene el routing para hacerle la petición correcta a la API
  ngOnInit() {
    let abi = this.route.snapshot.paramMap.get('abi');
    this.pokeService.getAbiDetails(abi).subscribe(details => {
      this.details = details;
    });

  }
}
