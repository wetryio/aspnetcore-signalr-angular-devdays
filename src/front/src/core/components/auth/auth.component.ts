import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, QuoteService } from '../../services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public userName: string;
  public quote: string;
  private quoteSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.quote = 'mocked quote';
  }

  ngOnDestroy() {
  }

  public start() {
    if (this.userName) {
      this.login().subscribe(() => {
        this.startChat();
      });
    }
  }

  private login(): Observable<any> {
    return this.authService.login(this.userName);
  }

  private startChat() {
    this.router.navigate(['/chat']);
  }

}
