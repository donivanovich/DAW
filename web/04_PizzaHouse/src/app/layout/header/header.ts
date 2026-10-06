import { Component } from '@angular/core';
import { BackButton } from './back-button/back-button';
import { Devices } from './devices/devices';
import { Buttons } from './buttons/buttons';

@Component({
  imports: [BackButton, Devices, Buttons],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
