
import { Component, HostListener, OnInit, inject, model } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClickAwayDirective } from './click-away.directive';
import { CaptchaService } from './captcha.service';
import { JsonPipe } from '@angular/common';
import { FormArrayTestComponent } from "./form-array-test/form-array-test.component";
import { HttpClient } from '@angular/common/http';





class CustomMap {
  map = new Map();
  set(key: any[], value: string){
    this.map.set(key.join("-"),value);
  }

  get(key: any[]): string | undefined {
    return this.map.get(key.join("-"));
  }
};




/**
 * @title Overlay basic example
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [OverlayModule, ClickAwayDirective, JsonPipe, FormArrayTestComponent],
})
export class AppComponent implements OnInit {

  http = inject(HttpClient)

callGreeting() {
    this.http.get('http://localhost:8080/delayed-api').subscribe((resp:any)=>{
      console.log(resp);
      
      // console.log(resp, new Date().toISOString());
      
      // const timeGap = new Date(resp.time).getTime() - new Date().getTime();
      // console.log(timeGap);
      
    })
}
  

  userUpdateTime = new Date().toISOString();

 async encrypt() {
  // console.log(await this.captchaService.encryptData(JSON.stringify(this.captchaService.mouseMoves.items)));

  console.log(this.userUpdateTime);
  
  console.log(await this.captchaService.encryptData(this.userUpdateTime));
  
}
  
  captchaService = inject(CaptchaService);


  name = model('');
  
showInvoice() {
    window.location.href ="https://dev.ctrm-xceler.com/ctrm-v2/#/invoices-beta?tabId=Approved&invoiceNumber=IN%2FP%2F50194"
}
  alert(arg0: number) {
      window.alert(arg0)
}
  ngOnInit(): void {
    this.map.set(['ptbf',false,false,false],"one");
    this.map.set(['ptbf',false,true,false],"two");


  }
  map = new CustomMap();

 

  test($event: Event) {
    $event.stopPropagation();
  }
  isOpen = false;


  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e: MouseEvent) {
    this.captchaService.addMouseMove({x:e.screenX,y:e.screenY,time:e.timeStamp});
  }

  @HostListener('document:keyup', ['$event']) 
  @HostListener('document:mousedown', ['$event']) 
  async onClick(e: any) {
    console.log('test');
    const date = new Date(new Date().getTime() + 3000).toISOString();
    console.log(date);
    
    
    this.userUpdateTime = new Date().toISOString(); 
    const key = await this.captchaService.encryptData(this.userUpdateTime);
    console.log(`X-hguyt-sdfds=${key};expires=${date};path=/`);
    
    document.cookie=`X-hguyt-sdfds=${key};expires=${date};path=/`
    
  }
}