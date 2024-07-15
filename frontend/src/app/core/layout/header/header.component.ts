import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matFactCheck, matMenu } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ matMenu, matFactCheck })],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [],
})
export class HeaderComponent {
  private _isDrawerOpen = signal(true);

  isDrawerOpen = this._isDrawerOpen.asReadonly();

  openDrawer(): void {
    this._isDrawerOpen.update((isDrawerOpen) => !isDrawerOpen);
  }
}
