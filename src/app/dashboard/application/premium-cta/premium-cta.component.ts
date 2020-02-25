import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-cta',
  templateUrl: './premium-cta.component.html',
  styleUrls: ['./premium-cta.component.scss']
})
export class PremiumCtaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToPlans() {
    this.router.navigate(['/payment-plans']);
  }
}
