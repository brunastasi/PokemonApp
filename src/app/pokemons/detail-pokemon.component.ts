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
      this.pokemon = this.pokemonsService.getPokemon(id);
  }

  goBack(): void {
      // Url de redirection
      this.router.navigate(['/pokemons']);

      // On accède à l'historique de navigation, puis on demande un retour en arrière
      // window.history.back();
  }

  goEdit(pokemon: Pokemon): void {
    const link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

}
