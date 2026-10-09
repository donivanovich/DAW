import { Component } from '@angular/core';
import { FooterTop } from './footer-top/footer-top';
import { FooterContact } from './footer-contact/footer-contact';
import { FooterBottom } from './footer-bottom/footer-bottom';

@Component({
  imports: [FooterTop, FooterContact, FooterBottom],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {}
