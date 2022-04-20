import {Component, HostListener} from '@angular/core';
import {RefreshTokenService} from '@app_services/auth/refresh-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private refreshTokenService: RefreshTokenService) {}

  @HostListener("window:unload", ["$event"])
  unloadHandler(): void {
    // Invalidate current tab as active RefreshToken timer
    this.refreshTokenService.invalidateCurrentTabId();
  }
}
