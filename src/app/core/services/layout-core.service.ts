import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutCoreService {
  private _$location = inject(Location);

  toolbarVisibility: WritableSignal<boolean> = signal(false);
  title: WritableSignal<string> = signal('');
  hasMenu: WritableSignal<boolean> = signal(false);
  hasBackButton: WritableSignal<boolean> = signal(false);
  firstButtonIcon: WritableSignal<string> = signal('');
  firstButtonAction: WritableSignal<() => void> = signal(() => {
    return;
  });
  secondButtonIcon: WritableSignal<string> = signal('');
  secondButtonAction: WritableSignal<() => void> = signal(() => {
    return;
  });

  back() {
    this._$location.back();
  }
}
