import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Apie mus - www.augaluoaze.lt`);
    this.meta.updateTag({ name: 'description', content: 'Internetinė augalų parduotuvė - internetinės prekybos lyderiai Lietuvoje bei viena didžiausių augalais prekiaujančių įmonių Lietuvoje ir Rytų Europoje.' });
  }

}
