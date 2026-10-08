import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ContactBar } from './layout/contact-bar/contact-bar';
import { Toolbar } from './layout/toolbar/toolbar';
import { HeroCarousel } from './pages/hero-carousel/hero-carousel';
import { MenuCategories } from './pages/menu-categories/menu-categories';
import { AtmosphereSection } from './pages/atmosphere-section/atmosphere-section';
import { PizzaSelection } from './pages/pizza-selection/pizza-selection';

@Component({
  imports: [Header, ContactBar, Toolbar, HeroCarousel, MenuCategories, AtmosphereSection, PizzaSelection],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('04_PizzaHouse');
}
