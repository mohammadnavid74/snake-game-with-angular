import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snake-game.component.html',
})
export class SnakeGameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  gridSize: number = 20;
  snake: { x: number; y: number; direction: string }[] = [
    { x: 100, y: 100, direction: 'RIGHT' },
    { x: 80, y: 100, direction: 'RIGHT' },
    { x: 60, y: 100, direction: 'RIGHT' },
  ];
  turns: { x: number; y: number; direction: string }[] = [];
  food: { x: number; y: number; direction: string } = {
    x: 200,
    y: 200,
    direction: '',
  };
  intervalId: any;
  faildState: boolean = false;
  startStatus: boolean = false;
  eatSelfState: boolean = false;
  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    let newDirection = '';

    if (event.key === 'ArrowUp' && this.snake[0].direction !== 'DOWN')
      newDirection = 'UP';
    else if (event.key === 'ArrowDown' && this.snake[0].direction !== 'UP')
      newDirection = 'DOWN';
    else if (event.key === 'ArrowLeft' && this.snake[0].direction !== 'RIGHT')
      newDirection = 'LEFT';
    else if (event.key === 'ArrowRight' && this.snake[0].direction !== 'LEFT')
      newDirection = 'RIGHT';

    if (newDirection && newDirection !== this.snake[0].direction) {
      setTimeout(() => {
        const head = this.snake[0];
        this.turns.push({ x: head.x, y: head.y, direction: newDirection });
        this.snake[0].direction = newDirection;
      }, 80);
    }
  }
  startGame() {
    this.turns = [];
    this.faildState = false;
    this.snake = [
      { x: 100, y: 100, direction: 'RIGHT' },
      { x: 80, y: 100, direction: 'RIGHT' },
      { x: 60, y: 100, direction: 'RIGHT' },
    ];
    this.startStatus = true;
    this.intervalId = setInterval(() => {
      console.log('sssssssssssssssssssssss');
      if (this.faildState) {
        this.faildState = false;
        clearInterval(this.intervalId);
        console.log('faildState :', this.faildState);
      }
      if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
        this.food.x = Math.floor(Math.random() * 20) * 20;
        this.food.y = Math.floor(Math.random() * 20) * 20;
        if (this.snake[this.snake.length - 1].direction === 'DOWN') {
          this.snake.push({
            x: this.snake[this.snake.length - 1].x,
            y: this.snake[this.snake.length - 1].y - this.gridSize,
            direction: this.snake[this.snake.length - 1].direction,
          });
        } else if (this.snake[this.snake.length - 1].direction === 'UP') {
          this.snake.push({
            x: this.snake[this.snake.length - 1].x,
            y: this.snake[this.snake.length - 1].y + this.gridSize,
            direction: this.snake[this.snake.length - 1].direction,
          });
        } else if (this.snake[this.snake.length - 1].direction === 'RIGHT') {
          this.snake.push({
            x: this.snake[this.snake.length - 1].x - this.gridSize,
            y: this.snake[this.snake.length - 1].y,
            direction: this.snake[this.snake.length - 1].direction,
          });
        } else if (this.snake[this.snake.length - 1].direction === 'LEFT') {
          this.snake.push({
            x: this.snake[this.snake.length - 1].x + this.gridSize,
            y: this.snake[this.snake.length - 1].y,
            direction: this.snake[this.snake.length - 1].direction,
          });
        }
      }
      this.clearCanvas();
      this.moveSnake();
      this.drawSnake();
      this.drawFood();
    }, 100);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 400);
  }

  drawSnake() {
    this.ctx.fillStyle = 'green';
    this.snake.forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
    });
  }

  drawFood() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
  }

  eatSelf() {
    for (let i = 1; i < this.snake.length; i++) {
      const element = this.snake[i];
      if (element.x === this.snake[0].x && element.y === this.snake[0].y) {
        return true;
      }
    }
    return false;
  }
  moveSnake() {
    if (
      this.snake[0].x < 0 ||
      this.snake[0].x > 381 ||
      this.snake[0].y < 0 ||
      this.snake[0].y > 381 ||
      this.eatSelf()
    ) {
      this.faildState = true;
    } else {
      for (let i = 0; i < this.snake.length; i++) {
        if (i === 3) {
        }
        console.log(this.turns);

        const segment = this.snake[i];
        for (let j = 0; j < this.turns.length; j++) {
          const turn = this.turns[j];
          if (segment.x === turn.x && segment.y === turn.y) {
            console.log('segment :', segment);
            segment.direction = turn.direction;
            if (i === this.snake.length - 1) {
              this.turns.splice(j, 1);
              console.log(this.snake);
              console.log(this.turns);
            }
          }
        }

        if (segment.direction === 'RIGHT') {
          segment.x += this.gridSize;
        } else if (segment.direction === 'LEFT') {
          segment.x -= this.gridSize;
        } else if (segment.direction === 'UP') {
          segment.y -= this.gridSize;
        } else if (segment.direction === 'DOWN') {
          segment.y += this.gridSize;
        }
      }
    }
  }
}
