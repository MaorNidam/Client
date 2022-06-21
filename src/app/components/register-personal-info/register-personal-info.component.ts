import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-personal-info',
  templateUrl: './register-personal-info.component.html',
  styleUrls: ['./register-personal-info.component.css']
})
export class RegisterPersonalInfoComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private usersService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisterDataFromSessionStorage();
    this.personalInfoForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$"), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$"), Validators.maxLength(50)]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required, Validators.maxLength(100)]],
    });
  }

  personalInfoForm: UntypedFormGroup;
  cities: any[] = ['Akko', 'Afula', 'Al Buţayḩah', 'Al Khushnīyah', 'Ashdod', 'Ashqelon', 'Bat Yam', 'Beersheba', 'Bené Beraq',
    'Bet Shemesh', 'Dimona', 'Eilat', 'El‘ad', 'Eṭ Ṭaiyiba', 'Fīq', 'Givatayim', 'Hadera', 'Haifa', 'Herẕliyya', 'Hod HaSharon',
    'Holon', 'Jerusalem', 'Karmiel', 'Kefar Sava', 'Lod', 'Ma‘alot Tarshīḥā', 'Modi‘in Makkabbim Re‘ut', 'Nahariyya', 'Nazareth',
    'Nes Ẕiyyona', 'Netanya', 'Netivot', 'Or Yehuda', 'Petaẖ Tiqwa', 'Qiryat Ata', 'Qiryat Bialik', 'Qiryat Gat', 'Qiryat Moẕqin',
    'Qiryat Ono', 'Qiryat Yam', 'Ra‘ananna', 'Rahat', 'Ramat Gan', 'Ramat HaSharon', 'Ramla', 'Reẖovot', 'Rishon LeẔiyyon',
    'Rosh Ha‘Ayin', 'Sakhnīn', 'Tamra', 'Tel Aviv-Yafo', 'Tiberias', 'Umm el Faḥm', 'Yehud', 'Ẕefat'];

  handleSubmit = () => {
    sessionStorage.removeItem("register");
    if (this.usersService.registerUser) {
      this.usersService.registerUser.firstName = this.personalInfoForm.get(['firstName']).value;
      this.usersService.registerUser.lastName = this.personalInfoForm.get(['lastName']).value;
      this.usersService.registerUser.city = this.personalInfoForm.get(['city']).value;
      this.usersService.registerUser.street = this.personalInfoForm.get(['street']).value;
      
      this.usersService.register(this.usersService.registerUser);
      this.router.navigate(['home']);
    }
    else {
      alert("Something went wrong, please try again.")
      this.router.navigate(['home/register/account'])
    }
  }

  getRegisterDataFromSessionStorage = () => {
    let lastSavedRegister = sessionStorage.getItem("register");
    if (lastSavedRegister) {
      this.usersService.registerUser = JSON.parse(lastSavedRegister);
    }
  }
}
