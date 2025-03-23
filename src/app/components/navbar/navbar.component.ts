import { Component, EventEmitter, Output } from '@angular/core';
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClient } from '@angular/common/http';
import { StrategyService } from '../../services/strategy.service'; // ggf. Pfad anpassen

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    GenericButtonComponent,
    RouterOutlet,
    RouterLink,
    DialogComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  strategy: 'average' | 'weighted' = 'average';

  @Output() strategyChanged = new EventEmitter<'average' | 'weighted'>();

  constructor(private http: HttpClient, private strategyService: StrategyService) {}

  showButtonClicked() {
    console.log('Benutzer clicked');
  }

  onStrategyToggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.strategy = checked ? 'weighted' : 'average';

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`http://localhost:8080/rating/changeStrategy?strategy=${this.strategy}`, {
      method: 'POST',
      headers
    })
      .then(res => {
        if (!res.ok) throw new Error('Fehler beim Wechseln der Strategie');
        console.log('Strategie geändert zu:', this.strategy);
        this.strategyService.updateStrategy(this.strategy); // 💥
      })
      .catch(err => {
        console.error('Strategiewechsel fehlgeschlagen:', err);
      });
  }
}
