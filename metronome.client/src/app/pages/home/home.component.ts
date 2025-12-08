import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../services/search.service';
import { Score } from '../../models/score';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class HomeComponent {
  public searchTerm: string = '';
  public searchResults: Score[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

  search() {
    this.searchService.search(this.searchTerm).subscribe((results) => {
      this.searchResults = results;
    });
  }

  navigateToScore(scoreId: number) {
    this.router.navigate(['/metronome', scoreId]);
  }
}
