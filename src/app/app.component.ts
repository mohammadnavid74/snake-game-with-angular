import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnakeGameComponent } from './components/snake-game/snake-game.component';

@Component({
  selector: 'app-root',
  imports: [SnakeGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular19-demo';
}
