import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { Router } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { POKEMONS } from '../model/mock-pokemons';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  pokemons: Pokemon[] = null;

  constructor(private router: Router, private pokemonsService: PokemonsService) { }

  ngOnInit(): void {
      this.pokemons = this.pokemonsService.getPokemons();
  }

  selectPokemon(pokemon: Pokemon): void {
      console.log('Vous avez selectionné ' + pokemon.name);
      const link = ['/pokemon', pokemon.id];
      this.router.navigate(link);
  }

}
