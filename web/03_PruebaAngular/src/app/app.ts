import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Content } from './content/content';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  imports: [Header, Content, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('03_PruebaAngular');
}
