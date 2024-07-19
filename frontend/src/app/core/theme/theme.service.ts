import { effect, Injectable, RendererFactory2, signal } from '@angular/core';
import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSignal = signal(Theme.System);
  private themesOrder = [Theme.System, Theme.Light, Theme.Dark];

  readonly theme = this.themeSignal.asReadonly();

  constructor(rendererFactory: RendererFactory2) {
    const renderer = rendererFactory.createRenderer(null, null);
    effect(() => {
      const theme = this.themeSignal();
      console.log(theme);
      if (theme === Theme.System) {
        renderer.removeAttribute(document.querySelector('html'), 'data-theme');
      } else {
        renderer.setAttribute(
          document.querySelector('html'),
          'data-theme',
          theme
        );
      }
    });
  }

  changeThemeToNextOne() {
    this.themeSignal.update((currentTheme) => {
      const index = this.themesOrder.findIndex(
        (theme) => theme === currentTheme
      );
      return this.themesOrder[(index + 1) % this.themesOrder.length];
    });
  }
}
