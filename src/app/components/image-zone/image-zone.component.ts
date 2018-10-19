import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const noop = () => {};

const MAXIMUM_WIDTH = 80;
const MAXIMUM_HEIGHT = 60;

const clampDimensions = (width, height) => {
  if (height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor((width * MAXIMUM_HEIGHT) / height);
    return [reducedWidth, MAXIMUM_HEIGHT];
  }

  if (width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / width);
    return [MAXIMUM_WIDTH, reducedHeight];
  }

  return [width, height];
};

@Component({
  selector: 'app-image-zone',
  templateUrl: './image-zone.component.html',
  styleUrls: ['./image-zone.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useClass: ImageZoneComponent,
      multi: true
    }
  ]
})
export class ImageZoneComponent implements OnInit, ControlValueAccessor {
  constructor(private cd: ChangeDetectorRef) {}
  public disabled = false;

  @ViewChild('canvas')
  canvasRef: ElementRef<HTMLCanvasElement>;

  background = '#eee';

  public onTouch = noop;
  public onChange = noop;
  public preview;
  public value;
  public ascii = '';

  private grayScales = [];

  ngOnInit() {}

  public get canvas() {
    return this.canvasRef.nativeElement;
  }

  public get ctx() {
    return this.canvas.getContext('2d');
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.preview = e.target.result;
      const image = new Image();
      image.src = this.preview;
      const [width, height] = clampDimensions(image.width, image.height);

      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.drawImage(image, 0, 0, width, height);
      this.applyGrayscale();
      this.toAscii(width);
      this.cd.markForCheck();
    };

    reader.readAsDataURL(file);

    console.log('on drop', ['$event']);
  }

  private applyGrayscale() {
    this.grayScales = [];
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness =
        0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      this.grayScales.push(brightness);
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.putImageData(imageData, 0, 0);
  }

  private toAscii(width) {
    this.ascii = '';
    const all = this.grayScales.reduce((avrg, i) => {
      return (avrg += i);
    }, 0);

    const average = all / this.grayScales.length;
    for (let i = 0; i < this.grayScales.length; i++) {
      if (i % width === 0) {
        this.ascii += '\n';
      }

      if (this.grayScales[i] > Math.ceil(average)) {
        this.ascii += '.';
      } else {
        this.ascii += ' ';
      }
    }
    console.log(this.ascii);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
