import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.name = localStorage.getItem('userName');
  }

  logOut() {
    this.auth.logOut().subscribe((res) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, (err) => {
    });
  }

}
