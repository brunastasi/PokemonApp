import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  // Recuperer l'url via route et rediriger via router
  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService) {}

  ngOnInit(): void {

      // Je récupère l'identifiant du pokemon contenu dans l'url
      const id = +this.route.snapshot.paramMap.get('id');
      this.pokemonsService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  goBack(): void {
      // Url de redirection
      this.router.navigate(['/pokemon/all']);

      // On accède à l'historique de navigation, puis on demande un retour en arrière
      // window.history.back();
  }

  delete(pokemon: Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon)
    .subscribe(_ => this.goBack());
  }

  goEdit(pokemon: Pokemon): void {
    const link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

}
