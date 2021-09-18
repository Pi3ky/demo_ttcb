import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  products = [
    {id: 'cat', name: 'Cat'},
    {id: 'dog', name: 'Dog'},
    {id: 'hamster', name: 'Hamster'},
  ]
  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
