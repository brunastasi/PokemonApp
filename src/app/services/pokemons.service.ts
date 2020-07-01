import { Injectable } from '@angular/core';
// Modele de pokemon (classe)
import { Pokemon } from '../model/pokemon';
// Données
import { POKEMONS } from '../model/mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private pokemonsUrl = 'api/pokemons';

  private log(log: string) {
    // Permet de centraliser la gestion des logs dans le service
    // tslint:disable-next-line: no-console
    console.info(log);
  }

  // Nom de la méthode qui cause l'erreur (OPERATION)
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

    // TERM : Est le paramètre du terme de la recherche que l'utilisateur compte effectuer
    searchPokemons(term: string): Observable<Pokemon[]> {
      // Vérification si l'utilisateur ne rentre pas un terme vide
      if (!term.trim()) {
        // si le terme de recherche n'existe pas, on renvoie un tableau vide.
        return of([]);
      }
  
      // Url spécifique via le terme de la requete
      return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
        tap(_ => this.log(`found pokemons matching "${term}"`)),
        catchError(this.handleError<Pokemon[]>('searchPokemons', []))
      );
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
        tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>('updatePokemon'))
      );
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
      const url = `${this.pokemonsUrl}/${pokemon.id}`;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
        catchError(this.handleError<Pokemon>('deletePokemon'))
      );
    }

    /** GET pokemons */
    // Retourne un observable qui contient tous les pokémons
    getPokemons(): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
        // Permet d'intéragir sur le déroulement des évènements généré par l'observable en éxecutant une action quelques conques
        // (Debug, Archivage des logs)
        tap(_ => this.log(`fetched pokemons`)),
        // Permet d'intercepter les erreurs
        catchError(this.handleError('getPokemons', []))
      );
    }

    /** GET pokemon */
    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable<Pokemon> {
      const url = `${this.pokemonsUrl}/${id}`;

      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
    }



  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
