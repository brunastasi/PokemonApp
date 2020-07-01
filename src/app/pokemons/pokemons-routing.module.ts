import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon.component';
import { AuthGuard } from '../services/auth-guard.service';

// les routes du module Pokémon
const pokemonsRoutes: Routes = [
  {
    // Permet de factoriser le début des url des routes
    path: 'pokemon',
    canActivate: [AuthGuard],
    children: [
      { path: 'all', component: ListPokemonComponent },
      { path: 'edit/:id', component: EditPokemonComponent },
      { path: ':id', component: DetailPokemonComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pokemonsRoutes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
