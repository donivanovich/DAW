import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

const categories = {
  pizzas: {
    title: 'Pizzas',
    image: '/img/menu/menu-2-370x278.jpg',
  },
  burgers: {
    title: 'Burgers',
    image: '/img/menu/menu-3-370x278.jpg',
  },
  salads: {
    title: 'Salads',
    image: '/img/menu/menu-1-370x278.jpg',
  },
  drinks: {
    title: 'Drinks',
    image: '/img/menu/menu-5-370x278.jpg',
  },
  seafood: {
    title: 'Seafood',
    image: '/img/menu/menu-6-370x278.jpg',
  },
  desserts: {
    title: 'Desserts',
    image: '/img/menu/menu-4-370x278.jpg',
  },
} as const;

@Component({
  imports: [RouterLink],
  selector: 'app-menu-category',
  styleUrl: './menu-category.css',
  templateUrl: './menu-category.html',
})
export class MenuCategory {
  private readonly route = inject(ActivatedRoute);
  readonly category =
    categories[this.route.snapshot.data['category'] as keyof typeof categories] ??
    categories.pizzas;
}
