import { distance } from "@/utils/utils";

class Piece {
  constructor(rowIndex, colIndex, size, color) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    this.size = size;
    this.width = this.size.width / this.size.columns;
    this.height = this.size.height / this.size.rows;
    this.x = this.size.x + this.width * this.colIndex;
    this.y = this.size.y + this.height * this.rowIndex;

    this.xCorrect = this.x;
    this.yCorrect = this.y;
    this.correct = true;

    this.color = color;
  }
  _drawRect(context, image) {
    context.beginPath();

    if (image) {
      this._innerImage(context, image);
    } else {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }

    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
  }
  _drawAngle(context, image) {
    context.beginPath();

    const sz = Math.min(this.width, this.height);
    const tabHeight = 0.2 * sz;

    // from top left
    context.moveTo(this.x, this.y);
    // to top right
    context.lineTo(
      this.x + this.width * Math.abs(this.top),
      this.y - tabHeight * Math.sign(this.top)
    );
    context.lineTo(this.x + this.width, this.y);
    // to bottom right
    context.lineTo(
      this.x + this.width - tabHeight * Math.sign(this.right),
      this.y + this.height * Math.abs(this.right)
    );
    context.lineTo(this.x + this.width, this.y + this.height);
    // to bottom left
    context.lineTo(
      this.x + this.width * Math.abs(this.bottom),
      this.y + this.height + tabHeight * Math.sign(this.bottom)
    );
    context.lineTo(this.x, this.y + this.height);
    // to top left
    context.lineTo(
      this.x + tabHeight * Math.sign(this.left),
      this.y + this.height * Math.abs(this.left)
    );
    context.lineTo(this.x, this.y);

    context.save();
    context.clip();

    if (image) {
      this._innerImage(context, image, tabHeight, sz);
    } else {
      context.fillStyle = this.color;
      context.fillRect(
        this.x - tabHeight,
        this.y - tabHeight,
        this.width + tabHeight * 2,
        this.height * tabHeight * 2
      );
    }

    context.restore();
    context.stroke();
  }
  _classicDraw(context, image) {
    context.beginPath();

    const sz = Math.min(this.width, this.height);
    const neck = 0.05 * sz;
    const tabWidth = 0.2 * sz;
    const tabHeight = 0.2 * sz;

    // from top left
    context.moveTo(this.x, this.y);
    // to top right
    if (this.top) {
      context.lineTo(this.x + this.width * Math.abs(this.top) - neck, this.y);
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.top) - neck,
        this.y - tabHeight * Math.sign(this.top) * 0.2,

        this.x + this.width * Math.abs(this.top) - tabWidth,
        this.y - tabHeight * Math.sign(this.top),

        this.x + this.width * Math.abs(this.top),
        this.y - tabHeight * Math.sign(this.top)
      );
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.top) + tabWidth,
        this.y - tabHeight * Math.sign(this.top),

        this.x + this.width * Math.abs(this.top) + neck,
        this.y - tabHeight * Math.sign(this.top) * 0.2,

        this.x + this.width * Math.abs(this.top) + neck,
        this.y
      );
    }
    context.lineTo(this.x + this.width, this.y);
    // to bottom right
    if (this.right) {
      context.lineTo(this.x + this.width, this.y + this.height * Math.abs(this.right) - neck);
      context.bezierCurveTo(
        this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
        this.y + this.height * Math.abs(this.right) - neck,

        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right) - tabWidth,

        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right)
      );
      context.bezierCurveTo(
        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right) + tabWidth,

        this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
        this.y + this.height * Math.abs(this.right) + neck,

        this.x + this.width,
        this.y + this.height * Math.abs(this.right) + neck
      );
    }
    context.lineTo(this.x + this.width, this.y + this.height);
    // to bottom left
    if (this.bottom) {
      context.lineTo(this.x + this.width * Math.abs(this.bottom) + neck, this.y + this.height);
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.bottom) + neck,
        this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

        this.x + this.width * Math.abs(this.bottom) + tabWidth,
        this.y + this.height + tabHeight * Math.sign(this.bottom),

        this.x + this.width * Math.abs(this.bottom),
        this.y + this.height + tabHeight * Math.sign(this.bottom)
      );
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.bottom) - tabWidth,
        this.y + this.height + tabHeight * Math.sign(this.bottom),

        this.x + this.width * Math.abs(this.bottom) - neck,
        this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

        this.x + this.width * Math.abs(this.bottom) - neck,
        this.y + this.height
      );
    }
    context.lineTo(this.x, this.y + this.height);
    // to top left
    if (this.left) {
      context.lineTo(this.x, this.y + this.height * Math.abs(this.left) + neck);
      context.bezierCurveTo(
        this.x + tabHeight * Math.sign(this.left) * 0.2,
        this.y + this.height * Math.abs(this.left) + neck,

        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left) + tabWidth,

        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left)
      );
      context.bezierCurveTo(
        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left) - tabWidth,

        this.x + tabHeight * Math.sign(this.left) * 0.2,
        this.y + this.height * Math.abs(this.left) - neck,

        this.x,
        this.y + this.height * Math.abs(this.left) - neck
      );
    }
    context.lineTo(this.x, this.y);

    context.save();
    context.clip();

    if (image) {
      this._innerImage(context, image, tabHeight, sz);
    } else {
      context.fillStyle = this.color;
      context.fillRect(
        this.x - tabHeight,
        this.y - tabHeight,
        this.width + tabHeight * 2,
        this.height * tabHeight * 2
      );
    }

    context.restore();
    context.stroke();
  }
  _innerImage(context, image, tabHeight = 0, sz = 0) {
    let scaleTabHeight = 0;
    if (sz !== 0) {
      scaleTabHeight =
        (Math.min(image.width / this.size.columns, image.height / this.size.rows) * tabHeight) / sz;
    }

    context.drawImage(
      image,
      (this.colIndex * image.width) / this.size.columns - scaleTabHeight,
      (this.rowIndex * image.height) / this.size.rows - scaleTabHeight,
      image.width / this.size.columns + scaleTabHeight * 2,
      image.height / this.size.rows + scaleTabHeight * 2,
      this.x - tabHeight,
      this.y - tabHeight,
      this.width + tabHeight * 2,
      this.height + tabHeight * 2
    );
  }
  draw(context, image, style = "classic") {
    switch (style) {
      case "rect":
        this._drawRect(context, image);
        break;
      case "angle":
        this._drawAngle(context, image);
        break;
      case "classic":
        this._classicDraw(context, image);
        break;
    }
  }
  isClose() {
    if (
      distance({ x: this.x, y: this.y }, { x: this.xCorrect, y: this.yCorrect }) <
      this.width / 3
    ) {
      return true;
    }
    return false;
  }
  snap(sound) {
    this.x = this.xCorrect;
    this.y = this.yCorrect;
    this.correct = true;
    sound.play();
  }
}

export default function buildPiece(rowIndex, colIndex, size, color) {
  return new Piece(rowIndex, colIndex, size, color);
}
