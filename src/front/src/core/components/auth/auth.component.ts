import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public userName: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
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
