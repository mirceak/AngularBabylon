import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  TranslateService,
} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceInternationalization {
  lang = 'ro';
  messages = [];

  constructor(private http: HttpClient, public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use('ro');
    this.setLanguage(this.lang);
    eval('setTimeout(()=>{console.log(4444, translate.instant("FORM.NAME"));}, 1000)') 
  }

  setLanguage(lang) {
    this.messages = this._messages.map((message) => {
      return message[lang];
    });
  }

  display(messages) {
    return messages.reduce((total, _message) => {
      let index = this._messages.findIndex((__message) => {
        return _message == __message.en;
      });
      if (index == -1) {
        console.log('missing internationalizations for: ' + _message);
        return total;
      }
      return total + ' ' + this.messages[index];
    }, '');
  }

  _messages = [
    {
      en: 'Hi',
      ro: 'Salut',
    },
    {
      en: 'Welcome',
      ro: 'Bine Ai Venit',
    },
    {
      en: 'Send',
      ro: 'Trimite',
    },
    {
      en: 'Login',
      ro: 'Login',
    },
    {
      en: 'Secret',
      ro: 'Secret',
    },
    {
      en: 'Talk',
      ro: 'Vorbeste',
    },
    {
      en: 'Home',
      ro: 'Acasa',
    },
    {
      en: 'Refer',
      ro: 'Creaza Referinta',
    },
    {
      en: 'Register',
      ro: 'Inregistrare',
    },
    {
      en: 'Register',
      ro: 'Inregistrare',
    },
    {
      en: 'Mail Boxes',
      ro: 'Cutii Postale',
    },
    {
      en: 'Referrals',
      ro: 'Referinte',
    },
    {
      en: 'Logout',
      ro: 'Delogare',
    },
    {
      en: 'Email',
      ro: 'Email',
    },
    {
      en: 'Username',
      ro: 'Nume Utilizator',
    },
    {
      en: 'Password',
      ro: 'Parola',
    },
    {
      en: 'Message',
      ro: 'Mesaj',
    },
    {
      en: 'Close',
      ro: 'Inchide',
    },

    {
      en: 'Share Secrets Piece By Piece On Multiple Communication Channels',
      ro:
        'Imparte Secretele Bucata Cu Bucata Pe Mai Multe Canale De Comunicare',
    },
    {
      en: 'Add New MailBox',
      ro: 'Adauga Cutie Postala Noua',
    },
    {
      en: 'Create Mailbox',
      ro: 'Creeaza Cutie Postala',
    },
    {
      en: 'Chat With A Mailbox',
      ro: 'Converseaza Cu O Cutie Postala',
    },
    {
      en: 'Accept MailBox Invitation',
      ro: 'Accepta Invitatia Catre Cutia Postala',
    },
    {
      en: 'Chat With Your Secret Connection',
      ro: 'Vorbeste Cu Persoana Secreta',
    },
    {
      en: 'Create Referral',
      ro: 'Creeaza Date De Inregistrare',
    },
    {
      en: 'Create Referral',
      ro: 'Creeaza Date De Inregistrare',
    },
    {
      en: 'Must Be Logged In!',
      ro: 'Trebuie Sa Fii Logat!',
    },
    {
      en: 'Already Logged In!',
      ro: 'Esti Deja Logat!',
    },
    {
      en: "MailBox's Name",
      ro: 'Numele Cutiei Postale',
    },

    {
      en: 'Enter name',
      ro: 'Introdu Numele',
    },
    {
      en: 'Enter message',
      ro: 'Introdu mesajul',
    },
    {
      en: 'Enter secret',
      ro: 'Introdu Secretul',
    },
    {
      en: 'Enter password',
      ro: 'Introdu parola',
    },
    {
      en: 'Enter username',
      ro: 'Introdu numele de utilizator',
    },
    {
      en: 'Enter email',
      ro: 'Introdu emailul',
    },
    {
      en: 'Secret 1',
      ro: 'Secret 1',
    },
    {
      en: 'Secret 2',
      ro: 'Secret 2',
    },
    {
      en: "Referal's Email",
      ro: 'Emailul Persoanei De Contact',
    },
    {
      en: 'Select Language',
      ro: 'Selecteaza Limba',
    },

    {
      en: 'field is required',
      ro: 'este un camp ce trebuie completat obligatoriu',
    },
    {
      en: 'needs to be a valid email',
      ro: 'trebuie sa fie un email valid',
    },
    {
      en: 'needs to be at least',
      ro: 'trebuie sa aiba macar',
    },
    {
      en: 'characters long',
      ro: 'caractere',
    },
    {
      en: 'needs to be minimum',
      ro: 'trebuie sa fie minim',
    },
  ];
}
