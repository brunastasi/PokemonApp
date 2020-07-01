import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PokemonRoutingModule } from './pokemons-routing.module';

import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { PokemonFormComponent } from './pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon.component';
import { SearchPokemonsComponent } from './search-pokemons.component';
import { LoaderComponent } from './loader.component';


import { BorderCardDirective } from '../directives/border-card.directive';
import { PokemonTypeColorPipe } from '../pipes/pokemon-type-color.pipe';
import { PokemonsService } from '../services/pokemons.service';
import { AuthGuard } from '../services/auth-guard.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PokemonRoutingModule
    ],
    declarations: [
        ListPokemonComponent,
        DetailPokemonComponent,
        EditPokemonComponent,
        SearchPokemonsComponent,
        PokemonFormComponent,
        LoaderComponent,
        BorderCardDirective,
        PokemonTypeColorPipe,
    ],
    providers: [PokemonsService, AuthGuard]
})
export class PokemonsModule { }
