import { IUser } from '../user/models/user.interface';
import { UserService } from '../user/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  id: string;
  editMode: boolean;
  user: IUser;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  mobile: string;
  isLoading: boolean=true;
  routeSubscription: Subscription;
  navigationSubscription: Subscription;

  constructor(private route: ActivatedRoute,private router:Router, private userService: UserService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initValues();
      }
    });
  }

  ngOnInit() {

  }

  initValues() {
    this.closeEditInfo();
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
      this.getUserInfo();
  }

 async getUserInfo() {
   const req= await this.userService.getUser(this.id);
   req.subscribe(res => {
     this.user = res;
     this.isLoading = false;
   },
   errorResponse => {
     console.log(errorResponse.error.message)
     alert(`Action is ${errorResponse.error.message}`);
     this.router.navigate(['/']);
   });
 }

  openEditInfo() {
    this.editMode = true;
  }
  closeEditInfo() {
    this.editMode = false;
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }
}
