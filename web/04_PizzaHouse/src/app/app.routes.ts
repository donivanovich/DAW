
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Main pages
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./features/menu/menu').then((m) => m.Menu),
  },

  // News
  {
    path: 'news/grid-blog',
    loadComponent: () =>
      import('./features/news/grid-blog/grid-blog').then((m) => m.GridBlog),
  },
  {
    path: 'news/masonry-blog',
    loadComponent: () =>
      import('./features/news/masonry-blog/masonry-blog').then((m) => m.MasonryBlog),
  },
  {
    path: 'news/blog-post',
    loadComponent: () =>
      import('./features/news/blog-post/blog-post').then((m) => m.BlogPost),
  },

  // Shop
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop').then((m) => m.Shop),
  },
  {
    path: 'shop/single-product',
    loadComponent: () =>
      import('./features/shop/single-product/single-product').then((m) => m.SingleProduct),
  },
  {
    path: 'shop/checkout',
    loadComponent: () =>
      import('./features/shop/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'shop/cart-page',
    loadComponent: () =>
      import('./features/shop/cart-page/cart-page').then((m) => m.CartPage),
  },

  // Services
  {
    path: 'services',
    loadComponent: () =>
      import('./features/pages/services/services/services').then((m) => m.Services),
  },
  {
    path: 'services/2',
    loadComponent: () =>
      import('./features/pages/services/services2/services2').then((m) => m.Services2),
  },
  {
    path: 'services/3',
    loadComponent: () =>
      import('./features/pages/services/services3/services3').then((m) => m.Services3),
  },
  {
    path: 'services/4',
    loadComponent: () =>
      import('./features/pages/services/services4/services4').then((m) => m.Services4),
  },
  {
    path: 'services/single-service',
    loadComponent: () =>
      import('./features/pages/services/single-service/single-service').then((m) => m.SingleService),
  },

  // Additional Pages
  {
    path: 'pages/404',
    loadComponent: () =>
      import('./features/pages/additional-pages/page-404/page-404').then((m) => m.Page404),
  },
  {
    path: 'pages/coming-soon',
    loadComponent: () =>
      import('./features/pages/additional-pages/coming-soon/coming-soon').then((m) => m.ComingSoon),
  },
  {
    path: 'pages/counters',
    loadComponent: () =>
      import('./features/pages/additional-pages/counters/counters').then((m) => m.Counters),
  },
  {
    path: 'pages/icon-lists',
    loadComponent: () =>
      import('./features/pages/additional-pages/icon-lists/icon-lists').then((m) => m.IconLists),
  },
  {
    path: 'pages/search-results',
    loadComponent: () =>
      import('./features/pages/additional-pages/search-results/search-results').then((m) => m.SearchResults),
  },
  {
    path: 'pages/privacy-policy',
    loadComponent: () =>
      import('./features/pages/additional-pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  {
    path: 'pages/contacts',
    loadComponent: () =>
      import('./features/pages/additional-pages/contacts/contacts').then((m) => m.Contacts),
  },

  // Elements
  {
    path: 'elements/typography',
    loadComponent: () =>
      import('./features/pages/elements/typography/typography').then((m) => m.Typography),
  },
  {
    path: 'elements/buttons',
    loadComponent: () =>
      import('./features/pages/elements/buttons/buttons').then((m) => m.Buttons),
  },
  {
    path: 'elements/forms',
    loadComponent: () =>
      import('./features/pages/elements/forms/forms').then((m) => m.Forms),
  },
  {
    path: 'elements/tabs-accordions',
    loadComponent: () =>
      import('./features/pages/elements/tabs-and-accordions/tabs-and-accordions').then((m) => m.TabsAndAccordions),
  },
  {
    path: 'elements/progress-bars',
    loadComponent: () =>
      import('./features/pages/elements/progress-bars/progress-bars').then((m) => m.ProgressBars),
  },
  {
    path: 'elements/grid-system',
    loadComponent: () =>
      import('./features/pages/elements/grid-system/grid-system').then((m) => m.GridSystem),
  },
  {
    path: 'elements/tables',
    loadComponent: () =>
      import('./features/pages/elements/tables/tables').then((m) => m.Tables),
  },

  // Gallery
  {
    path: 'gallery/grid',
    loadComponent: () =>
      import('./features/pages/gallery/grid-gallery/grid-gallery').then((m) => m.GridGallery),
  },

  // Redirects
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'pages/404',
  },
];
