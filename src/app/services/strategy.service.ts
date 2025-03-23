import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  private strategyChangeSubject = new BehaviorSubject<'average' | 'weighted'>('average');
  strategyChanged$ = this.strategyChangeSubject.asObservable();

  updateStrategy(strategy: 'average' | 'weighted') {
    this.strategyChangeSubject.next(strategy);
  }
}
