import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ContactBar } from './layout/contact-bar/contact-bar';
import { Toolbar } from './layout/toolbar/toolbar';

@Component({
  imports: [RouterOutlet, Header, ContactBar, Toolbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('04_PizzaHouse');
}
