import {
  Injectable,
  RendererFactory2,
  Signal,
  effect,
  signal,
} from '@angular/core';
import { Theme } from './theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly THEME_KEY = 'Theme';
  private readonly currentThemeInternal = signal(Theme.SYSTEM);
  private readonly daisyThemes = new Map<Theme, string>([
    [Theme.SYSTEM, 'system'],
    [Theme.LIGHT, 'fantasy'],
    [Theme.DARK, 'dracula'],
  ]);

  constructor(rendererFactory: RendererFactory2) {
    this.handleThemeChanges(rendererFactory);
    this.loadSavedTheme();
  }

  get currentTheme(): Signal<Theme> {
    return this.currentThemeInternal.asReadonly();
  }

  changeThemeToNextOne(): void {
    const themesOrder = [...this.daisyThemes.keys()];

    this.currentThemeInternal.update(currentTheme => {
      const index = themesOrder.findIndex(theme => theme === currentTheme);
      return themesOrder[(index + 1) % themesOrder.length];
    });
  }

  private loadSavedTheme(): void {
    const savedTheme =
      localStorage.getItem(ThemeService.THEME_KEY) ?? Theme[Theme.SYSTEM];
    this.currentThemeInternal.set(Theme[savedTheme as keyof typeof Theme]);
  }

  private handleThemeChanges(rendererFactory: RendererFactory2): void {
    const renderer = rendererFactory.createRenderer(null, null);

    effect(() => {
      const theme = this.currentThemeInternal();
      if (theme === Theme.SYSTEM) {
        renderer.removeAttribute(document.querySelector('html'), 'data-theme');
      } else {
        renderer.setAttribute(
          document.querySelector('html'),
          'data-theme',
          this.daisyThemes.get(theme)!
        );
      }
      localStorage.setItem(ThemeService.THEME_KEY, Theme[theme]);
    });
  }
}
