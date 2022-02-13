import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})

export class TutorialDetailsComponent implements OnInit {
  currentTutorial = null;
  message = "";

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  getTutorial(id): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: this.currentTutorial.published
    }

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = "The tutorial was updated successfully!";
        },
        error => {
          console.log(error);
        }
      )
  }

  updatePublished(status): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    }

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = "The tutorial was updated successfully!";
        },
        error => {
          console.log(error);
        }
      )
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        }
      )
  }

  ngOnInit(): void {
    this.message = "";
    this.getTutorial(this.route.snapshot.paramMap.get("id"));
  }
}
