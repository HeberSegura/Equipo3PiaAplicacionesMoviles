import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
 
  constructor(private http: HttpClient) {}
 
  //Lógica utilizada para pedirle pokemones a la API para la lista de pokemones
  getPokemon(offset = 0) {
    return this.http
      .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }
 
  //Lógica utilizada en la búsqueda para encontrar un pokemon y su imagen en la API
  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }
 
  //Lógica utilizada para obtener la imagen del pokemon utilizada en la busqueda y la lista
  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }
 
  //Lógica utilizada para pedirle a la API los detalles del pokemon indicado, junto con sus sprites
  getPokeDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }

  //Lógica utilizada para pedirle a la API los detalles de la abilidad indicada
  getAbiDetails(index) {
    return this.http.get(`${this.baseUrl}/ability/${index}`).pipe(
      map(abi => {
        return abi;
      })
    )
  }

  //Lógica utilizada para peditrle a la API los detalles del movimiento indicado
  getMovDetails(index) {
    return this.http.get(`${this.baseUrl}/move/${index}`).pipe(
      map(mov => {
        return mov;
      })
    )
  }
}