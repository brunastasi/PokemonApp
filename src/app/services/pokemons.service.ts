import { Injectable } from '@angular/core';
// Modele de pokemon (classe)
import { Pokemon } from '../model/pokemon';
// Données
import { POKEMONS } from '../model/mock-pokemons';


@Injectable()
export class PokemonsService {

        // Retourne tous les pokémons
        getPokemons(): Pokemon[] {
          return POKEMONS;
        }

        // Retourne le pokémon avec l'identifiant passé en paramètre
        getPokemon(id: number): Pokemon {
          const pokemons = this.getPokemons();

          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < pokemons.length; index++) {
            if (id === pokemons[index].id) {
              return pokemons[index];
            }
          }
        }

        getPokemonTypes(): string[] {
          return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
        }
}
