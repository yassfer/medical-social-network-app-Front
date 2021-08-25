import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/entities/User";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Message } from "src/app/entities/message";
import { NavbarService } from "./navbar.service";
import { NotificationService } from "src/app/pages/notifications/notification.service";
import { Invitation } from "src/app/entities/invitation";
import { InvitationService } from "src/app/pages/invitation/invitation.service";
import { MessagerieService } from "src/app/pages/messagerie/messagerie.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public isCollapsed = true;
  closeResult: string;
  idCurrentUser: number;
  currentUser: User;
  invitations: Invitation[];
  FiveLastInvitations: Invitation[];
  messages: Message[];
  lastFiveMsg: Array<Message> = [];
  UserToTalk :User = new User();
/**/

  currentId =1;
  myNotifs=[];
  numberMynotif:number;
  notifications = []

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private navbarService: NavbarService,
    private notifService: NotificationService,
    private invitationService: InvitationService,
    private msgService: MessagerieService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.idCurrentUser = Number(tokenStorage.getId());
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
   updateColor = () => {
   var navbar = document.getElementsByClassName('navbar')[0];
     if (window.innerWidth < 993 && !this.isCollapsed) {
       navbar.classList.add('bg-white');
       navbar.classList.remove('navbar-transparent');
     } else {
       navbar.classList.remove('bg-white');
       navbar.classList.add('navbar-transparent');
     }
   };

   getAllNotif (){
    this.notifService.getNotifList().subscribe( data => {
      this.notifications=data;
      this.filterNotifbyUser(this.notifications)
       })

  }

    filterNotifbyUser(notifs){
      notifs.forEach(element => {
        if (element.idu==this.currentId) {
  this.myNotifs.push(element);
         this.numberMynotif= this.NumberNotif(this.myNotifs);
        }
      });
    }

    NumberNotif(notif){
      return notif.length;
    }

    deleteNotif(id){
      console.log(id);
      this.notifService.deleteNotif(id).subscribe(data => {
        console.log(data);

       },
      error => console.log(error));
      window.location.reload();

    }
  ngOnInit() {
    this.getAllNotif();
    this.getUser(this.idCurrentUser);
    this.getMsg(this.idCurrentUser);
    this.getInvitations(this.idCurrentUser);
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function() {
        mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function() {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function() {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  open(content) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnDestroy(){
     window.removeEventListener("resize", this.updateColor);
  }
  opencommunities(){
    this.router.navigate(['/allcommunities']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
}
getUser(id: number) {
  this.navbarService.getUserById(id).subscribe(data => {
    this.currentUser = data;
  },
    error => console.log(error));
}

/**************** Invitations *************/

getInvitations(idCurrentUser: number) {
  this.invitationService.getAllInvitations(idCurrentUser).subscribe(data => {
    this.invitations = data;
    console.log(this.invitations);
    if(this.invitations.length<5){
        this.FiveLastInvitations = this.invitations;
    } else {
      for(let i = 0; i<5; i++){
        this.FiveLastInvitations.push(this.invitations[i]);
      }
    }
  },
    error => console.log(error));
}

deleteInvitation(invitationId: number){
  this.invitationService.DeleteInvitation(invitationId).subscribe(data => {
  },
    error => console.log(error));
    window.location.reload();
}



AcceptInvitation(id: number, invitationId: number){
  this.invitationService.AcceptInvitation(id, invitationId).subscribe(data => {
  },
    error => console.log(error));
    window.location.reload();
}

/**************** end Invitations *************/



/**************** Messages *************/

getSender(id: number, message: Message) {
  this.navbarService.getUserById(id).subscribe(data => {
    message.senderUser = data;
  },
    error => console.log(error));
}

getMsg(idCurrentUser: number) {
  this.msgService.getMessageByReceiver(idCurrentUser).subscribe(data => {
    this.messages = data;

    if(this.messages.length<5){
      for(let i=0; i<this.messages.length; i++){
        for(let j=0; j<this.messages.length; j++){
          this.getSender(this.messages[i].sender, this.messages[i]);
          this.lastFiveMsg.push(this.messages[i]);
        }
      }
  } else {
    for(let i=0; i<5; i++){
      for(let j=1; j<5; j++){
        this.getSender(this.messages[i].sender, this.messages[i]);
        this.lastFiveMsg.push(this.messages[i]);
      }
    }
  }
},
    error => console.log(error));
}


/**************** end Messages *************/

}
