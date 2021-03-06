import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; // Permet de rediriger le client après validation du formulaire
import { FormsModule } from '@angular/forms';

import { Pokemon } from '../model/pokemon';
import { PokemonsService } from '../services/pokemons.service';


@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon; // propriété d'entrée du composant
  types: Array<string>; // types disponibles pour un pokémon : 'Eau', 'Feu', etc ...
  constructor(
      private pokemonsService: PokemonsService,
      private router: Router) { }

  ngOnInit() {
      // Initialisation de la propriété types
      this.types = this.pokemonsService.getPokemonTypes();
  }

  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type: string): boolean {
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) { return true; }
      return false;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectType($event: any, type: string): void {
      const checked = $event.target.checked;
      if (checked) {
          this.pokemon.types.push(type);
      } else {
          const index = this.pokemon.types.indexOf(type);
          if (index > -1) {
              this.pokemon.types.splice(index, 1);
          }
      }
  }

  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
      if (this.pokemon.types.length === 1 && this.hasType(type)) {
          return false;
      }
      if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
          return false;
      }

      return true;
  }

  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit(): void {
      console.log('Submit form !');
      this.pokemonsService.updatePokemon(this.pokemon)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
      const link = ['/pokemon', this.pokemon.id];
      this.router.navigate(link);
  }

}
