import { Component } from '@angular/core';
import { HeaderTop } from './header-top/header-top';
import { HeaderLogo } from './header-logo/header-logo';
import { HeaderContact } from './header-contact/header-contact';
import { HeaderNavigation } from './header-navigation/header-navigation';

@Component({
  imports: [HeaderTop, HeaderLogo, HeaderContact, HeaderNavigation],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
