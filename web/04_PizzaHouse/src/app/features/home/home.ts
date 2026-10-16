import { Component } from '@angular/core';
import { HeroCarousel } from './hero-carousel/hero-carousel';
import { MenuCategories } from './menu-categories/menu-categories';
import { BannerAtmosphere } from './banner-atmosphere/banner-atmosphere';
import { PizzaSelection } from './pizza-selection/pizza-selection';
import { BannerSalads } from './banner-salads/banner-salads';
import { Opinions } from './opinions/opinions';
import { Gallery } from './gallery/gallery';
import { BookTables } from './book-tables/book-tables';
import { Benefits } from './benefits/benefits';

@Component({
  imports: [
    HeroCarousel,
    MenuCategories,
    BannerAtmosphere,
    PizzaSelection,
    BannerSalads,
    Opinions,
    Gallery,
    BookTables,
    Benefits,
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
