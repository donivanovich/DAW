import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { HeroCarousel } from './features/hero-carousel/hero-carousel';
import { MenuCategories } from './features/menu-categories/menu-categories';
import { AtmosphereSection } from './features/atmosphere-section/atmosphere-section';
import { PizzaSelection } from './features/pizza-selection/pizza-selection';
import { BannerSalads } from './features/banner-salads/banner-salads';
import { Opinions } from './features/opinions/opinions';
import { Gallery } from './features/gallery/gallery';
import { BookTables } from './features/book-tables/book-tables';
import { Features } from './features/features/features';
import { Footer } from './layout/footer/footer';

@Component({
  imports: [Header, HeroCarousel, MenuCategories, AtmosphereSection, PizzaSelection, BannerSalads, Opinions, Gallery, BookTables, Features, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('04_PizzaHouse');
}
