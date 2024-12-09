
import { Component, HostListener, OnInit, inject, model } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClickAwayDirective } from './click-away.directive';
import { CaptchaService } from './captcha.service';
import { JsonPipe } from '@angular/common';
import { FormArrayTestComponent } from "./form-array-test/form-array-test.component";
import { HttpClient } from '@angular/common/http';





class CustomMap {
  map = new Map();
  set(key: any[], value: string) {
    this.map.set(key.join("-"), value);
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
    this.http.get('http://localhost:8080/delayed-api').subscribe((resp: any) => {
      console.log(resp);

      // console.log(resp, new Date().toISOString());

      // const timeGap = new Date(resp.time).getTime() - new Date().getTime();
      // console.log(timeGap);

    })
  }

  callGreetingv2() {
    this.http.get('http://localhost:8080/delayed-api-v2').subscribe((resp: any) => {
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
    window.location.href = "https://dev.ctrm-xceler.com/ctrm-v2/#/invoices-beta?tabId=Approved&invoiceNumber=IN%2FP%2F50194"
  }
  alert(arg0: number) {
    window.alert(arg0)
  }
  ngOnInit(): void {
    this.map.set(['ptbf', false, false, false], "one");
    this.map.set(['ptbf', false, true, false], "two");


  }
  map = new CustomMap();



  test($event: Event) {
    $event.stopPropagation();
  }
  isOpen = false;


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.captchaService.addMouseMove({ x: e.screenX, y: e.screenY, time: e.timeStamp });
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

    document.cookie = `X-hguyt-sdfds=${key};expires=${date};path=/`

  }

  testFetch() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,ml;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Origin", "http://localhost:4200");
    myHeaders.append("Referer", "http://localhost:4200/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "same-site");
    myHeaders.append("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36");
    myHeaders.append("X-Current-Time", "2024-12-09T17:18:34.532Z");
    myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Linux\"");
    myHeaders.append("Cookie", "accessToken=eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJUcmFkZXIiLCJGaW5hbmNlIiwiT3BlcmF0aW9ucyIsIlJpc2tPZmZpY2UiXSwidGVuYW50SWQiOiJkNzQwOGQzMS1kNzIwLTQxNzMtYjc2ZS0wNTk1Y2UyNjc5YjQiLCJ1c2VyVHlwZSI6IkJ1c2luZXNzVXNlciIsInByb2R1Y3RTdWJzY3JpcHRpb24iOiJ7XCJzZWxlY3RlZFwiOltcImN0cm1cIixcInRyZWFzdXJ5XCIsXCJvaXNcIl0sXCJkZWZhdWx0XCI6XCJjdHJtXCJ9Iiwic3ViIjoic2FqaXRoIiwianRpIjoiQnVzaW5lc3NVc2VyIiwiaWF0IjoxNzMyODA5OTM2LCJleHAiOjE3MzQ2MDk5MzZ9.dmZ1W-7XJf2Nr6l-zIz1yRuot8Ugj4UexWdOagElQ2MVu05UPIGC3OzsEekkzFfZf3s0yNH5mslVYvQzuKEjNA");

    const requestOptions:any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8080/delayed-api", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}