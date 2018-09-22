import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  itemsCaio: Array<{title: string, logo: string, link: string}>;
  itemsSamuel: Array<{title: string, logo: string, link: string}>;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };
  constructor(public navCtrl: NavController, private appBrowser: InAppBrowser) {
    this.itemsCaio = [
      { title: 'Facebook', logo: "logo-facebook", link: "https://www.facebook.com/caio.fernandes13"},
      { title: 'GitHub', logo: "logo-github", link: "https://github.com/CaioFernandes13" },
      { title: 'LinkedIn', logo: "logo-linkedin", link: "https://www.linkedin.com/in/caio-fernandes-ufv/" },
      { title: 'Twitter', logo: "logo-twitter", link: "https://twitter.com/caiofer_s" },
      { title: 'Instagram', logo: "logo-instagram", link: "https://instagram.com/caiof13/?hl=pt-br" }
    ];
    this.itemsSamuel = [
      { title: 'Facebook', logo: "logo-facebook", link: ""},
      { title: 'GitHub', logo: "logo-github", link: "" },
      { title: 'LinkedIn', logo: "logo-linkedin", link: "" }
    ];
  }
  private openWithInAppBrowser(url : string){
    let target = "_blank";
    this.appBrowser.create(url,target,this.options);
  }
  public itemSelected(item){
       this.openWithInAppBrowser(item.link);  
   }
}
