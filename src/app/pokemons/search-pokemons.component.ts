import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-search-pokemons',
  templateUrl: './search-pokemons.component.html',
  styleUrls: ['./search-pokemons.component.scss'],
})
export class SearchPokemonsComponent implements OnInit {
  private searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requête
      debounceTime(300),
      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // on retourne la liste des résultats correpsondant aux termes de la recherche
      switchMap((term: string) => this.pokemonsService.searchPokemons(term))
    );
  }

  gotoDetail(pokemon: Pokemon): void {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
