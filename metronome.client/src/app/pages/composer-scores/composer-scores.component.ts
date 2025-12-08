import { Component } from '@angular/core';
import { Score } from '../../models/score';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ScoreService } from '../../services/score.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComposerService } from '../../services/composer.service';
import { Composer } from '../../models/composer';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-composer-scores',
  templateUrl: './composer-scores.component.html',
  styleUrls: ['./composer-scores.component.css'],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class ComposerScoresComponent {
  public scores: Score[] = [];
  public composer: Composer | undefined;
  public isLoading: boolean = false;
  constructor(
    private scoreService: ScoreService,
    private composerService: ComposerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const composerId = +params['composerId'];
      if (composerId) {
        this.loadScores(composerId);
        this.loadComposer(composerId);
      }
    });
  }

  viewScore(scoreId: number | undefined) {
    if (scoreId) {
      this.router.navigate([`metronome/${scoreId}`]);
    }
  }

  loadComposer(composerId: number) {
    this.composerService.getComposer(composerId).subscribe({
      next: (composer) => {
        this.composer = composer;
      },
    });
  }

  loadScores(composerId: number) {
    this.isLoading = true;
    this.scoreService.getScoresForComposer(composerId).subscribe({
      next: (scores) => {
        this.scores = scores;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
