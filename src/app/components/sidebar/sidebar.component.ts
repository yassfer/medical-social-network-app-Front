import { Component, OnInit } from "@angular/core";
import { User } from "src/app/entities/User";
import { SidebarService } from "./sidebar.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  {
    path: "/publications",
    title: "Home",
    icon: "icon-bank",
    class: ""
  },

  {
    path: "/user-profile",
    title: "User Profile",
    icon: "icon-single-02",
    class: ""
  },

  {
    path: "/challenge",
    title: "Challenge",
    icon: "icon-trophy",
    class: ""
  },
  {
    path: "/chat",
    title: "Chatbot",
    icon: "icon-satisfied",
    class: ""
  },
  {
    path: "/messagerie",
    title: "Messagerie",
    icon: "icon-chat-33",
    class: ""
  },
  {
    path: "/communities",
    title: "Communities",
    icon: "icon-world",
    class: ""
  },

  {
    path: "/donation",
    title: "Donations",
    icon: "icon-sound-wave",
    class: ""
  },
  {
    path: "/publicité",
    title: "Publicités",
    icon: "icon-bag-16",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentUserId: number = 2;
  user: User = new User();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.getUser(4);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  getUser(id: number) {
    this.sidebarService.getCurrentUser(id).subscribe(data => {
      console.log(data);
      //this.user = data;
      //console.log(this.user);
    },
      error => console.log(error))
  }
}
