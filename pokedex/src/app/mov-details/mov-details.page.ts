import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mov-details',
  templateUrl: './mov-details.page.html',
  styleUrls: ['./mov-details.page.scss'],
})
export class MovDetailsPage implements OnInit {
  details: any;
 
  constructor(private pokeService: PokemonService, private route: ActivatedRoute) { }
  
  //Se toma el índice que tiene el routing para hacerle la petición correcta a la API
  ngOnInit() {
    let mov = this.route.snapshot.paramMap.get('mov');
    this.pokeService.getMovDetails(mov).subscribe(details => {
      this.details = details;
    });

  }
}
