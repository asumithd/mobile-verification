import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  countryList: any[] = [];
  mobileForm: FormGroup;
  valid: Boolean;
  link: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.mobileForm = this.formBuilder.group({
      codeNo: [''],
      phoneNo: [''],
    });
  }
  onSubmit() {
    const data = this.mobileForm.value;
    const access_key = 'a1eae114356eb7c743c42f4c8091eb35';
    const country_code = data.codeNo;
    const phone_number = data.phoneNo;

    const httpLink = `http://apilayer.net/api/validate?access_key=${access_key}&number=${phone_number}&country_code=${country_code}&format=1`;

    if (location.protocol !== 'https:') {
      location.replace(
        `https:${location.href.substring(location.protocol.length)}`
      );
    }
    this.http.get(httpLink).subscribe((data) => {
      this.countryList = [...this.countryList, data];
      this.valid = this.countryList[0].valid;
      console.log(this.countryList, 'data');
    });
    this.mobileForm.reset();
  }

  onOptionsSelected() {
    this.countryList = [];
  }
}
