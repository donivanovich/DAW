import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header-navigation',
  styleUrl: './header-navigation.css',
  templateUrl: './header-navigation.html',
})
export class HeaderNavigation {
  isMenuOpen = false;
  openSubmenu: string | null = null;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.openSubmenu = null;
    }
  }

  toggleSubmenu(name: string): void {
    this.openSubmenu = this.openSubmenu === name ? null : name;
  }

  handleNavigationClick(event: MouseEvent): void {
    if (event.target instanceof Element && event.target.closest('a')) {
      this.isMenuOpen = false;
      this.openSubmenu = null;
    }
  }
}
