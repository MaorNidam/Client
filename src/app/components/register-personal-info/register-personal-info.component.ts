import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-personal-info',
  templateUrl: './register-personal-info.component.html',
  styleUrls: ['./register-personal-info.component.css']
})
export class RegisterPersonalInfoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisterDataFromSessionStorage();
    this.personalInfoForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
    });
  }

  personalInfoForm: FormGroup;
  cities: string[] = ['Akko', 'Afula', 'Al Buţayḩah', 'Al Khushnīyah', 'Ashdod', 'Ashqelon', 'Bat Yam', 'Beersheba', 'Bené Beraq',
    'Bet Shemesh', 'Dimona', 'Eilat', 'El‘ad', 'Eṭ Ṭaiyiba', 'Fīq', 'Givatayim', 'Hadera', 'Haifa', 'Herẕliyya', 'Hod HaSharon',
    'Holon', 'Jerusalem', 'Karmiel', 'Kefar Sava', 'Lod', 'Ma‘alot Tarshīḥā', 'Modi‘in Makkabbim Re‘ut', 'Nahariyya', 'Nazareth',
    'Nes Ẕiyyona', 'Netanya', 'Netivot', 'Or Yehuda', 'Petaẖ Tiqwa', 'Qiryat Ata', 'Qiryat Bialik', 'Qiryat Gat', 'Qiryat Moẕqin',
    'Qiryat Ono', 'Qiryat Yam', 'Ra‘ananna', 'Rahat', 'Ramat Gan', 'Ramat HaSharon', 'Ramla', 'Reẖovot', 'Rishon LeẔiyyon',
    'Rosh Ha‘Ayin', 'Sakhnīn', 'Tamra', 'Tel Aviv-Yafo', 'Tiberias', 'Umm el Faḥm', 'Yehud', 'Ẕefat'];

  handleSubmit = () => {

  }

  getRegisterDataFromSessionStorage = () => {
    let lastSavedRegister = sessionStorage.getItem("register");
    if (lastSavedRegister) {
      this.usersService.registerUser = JSON.parse(lastSavedRegister);
    }
  }
}
