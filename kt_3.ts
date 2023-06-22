interface Logger {
	log(message: string): void;
  }
  
  class LogToConsole implements Logger {
	log(message: string): void {
	  console.log(message);
	}
  }
  
  class Plotter {
	private position: { x: number; y: number };
	private angle: number;
	private color: string;
	private carriageState: boolean;
	private logger: Logger;
  
	constructor(logger: Logger) {
	  this.position = { x: 0, y: 0 };
	  this.angle = 0;
	  this.color = "чорный";
	  this.carriageState = false;
	  this.logger = logger;
	}
  
	private drawLine(from: { x: number; y: number }, to: { x: number; y: number }): void {
	  this.logger.log(`...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${this.color} цвет.`);
	}
  
	private calcNewPosition(distance: number): { x: number; y: number } {
	  const angleInRadians = this.angle * (Math.PI / 180.0);
	  const x = this.position.x + distance * Math.cos(angleInRadians);
	  const y = this.position.y + distance * Math.sin(angleInRadians);
	  return { x: Math.round(x), y: Math.round(y) };
	}
  
	private move(distance: number): void {
	  const newPosition = this.calcNewPosition(distance);
	  if (this.carriageState) {
		this.drawLine(this.position, newPosition);
	  } else {
		this.logger.log(`Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`);
	  }
	  this.position = newPosition;
	}
  
	turn(angle: number): void {
	  this.logger.log(`Поворачиваем на ${angle} градусов`);
	  this.angle = (this.angle + angle) % 360.0;
	}
  
	carriageUp(): void {
	  this.logger.log("Поднимаем каретку");
	  this.carriageState = false;
	}
  
	carriageDown(): void {
	  this.logger.log("Опускаем каретку");
	  this.carriageState = true;
	}
  
	setColor(color: string): void {
	  this.logger.log(`Устанавливаем ${color} цвет линии.`);
	  this.color = color;
	}
  
	setPosition(position: { x: number; y: number }): void {
	  this.logger.log(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
	  this.position = position;
	}
  
	drawTriangle(size: number): void {
	  this.setColor("зелёный");
	  this.carriageDown();
	  for (let i = 0; i < 3; i++) {
		this.move(size);
		this.turn(120.0);
	  }
	  this.carriageUp();
	}
  }
  
  const logger = new LogToConsole();
  const plotter = new Plotter(logger);
  plotter.drawTriangle(100.0);
  