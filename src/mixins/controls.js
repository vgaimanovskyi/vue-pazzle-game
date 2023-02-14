import { replacePiece } from "@/utils/utils";

export default {
  methods: {
    addEventListeners() {
      this.canvas.addEventListener("mousedown", this.onMouseDown);
      this.canvas.addEventListener("mousemove", this.onMouseMove);
      this.canvas.addEventListener("mouseup", this.onMouseUp);

      this.canvas.addEventListener("touchstart", this.onTouchStart);
      this.canvas.addEventListener("touchmove", this.onTouchMove);
      this.canvas.addEventListener("touchend", this.onTouchEnd);
    },
    onTouchStart(event) {
      const loc = this.getPressedPieceLocation(event);
      this.onMouseDown(loc);
    },
    onTouchMove(event) {
      const loc = this.getPressedPieceLocation(event);
      this.onMouseMove(loc);
    },
    onTouchEnd() {
      this.onMouseUp();
    },
    onMouseDown(event) {
      const imgData = this.helperContext.getImageData(event.offsetX, event.offsetY, 1, 1);
      if (imgData.data[3] === 0) return;
      const clickedColor = `rgb(${imgData.data[0]},${imgData.data[1]},${imgData.data[2]})`;

      // this.selectedPiece = this.getPressedPiece(event);
      this.selectedPiece = this.getPressedPieceByColor(event, clickedColor);

      if (this.selectedPiece !== null) {
        this.pieces = replacePiece(this.pieces, this.selectedPiece, "end");
        this.selectedPiece.offset = {
          x: event.offsetX - this.selectedPiece.x,
          y: event.offsetY - this.selectedPiece.y,
        };
        this.selectedPiece.correct = false;
      }
    },
    onMouseMove(event) {
      if (this.selectedPiece !== null) {
        this.selectedPiece.x = event.offsetX - this.selectedPiece.offset.x;
        this.selectedPiece.y = event.offsetY - this.selectedPiece.offset.y;
      }
    },
    onMouseUp() {
      if (this.selectedPiece?.isClose()) {
        this.selectedPiece.snap(this.popSound);
        this.pieces = replacePiece(this.pieces, this.selectedPiece, "start");
        if (this.isComplete() && this.endTime === null) {
          let now = new Date().getTime();
          this.endTime = now;
          setTimeout(this.endGame, 300);
        }
      }
      this.selectedPiece = null;
    },

    getPressedPieceLocation(event) {
      const rect = event.target.getBoundingClientRect();
      const loc = {
        offsetX: event.touches[0].clientX - rect.left,
        offsetY: event.touches[0].clientY - rect.top,
      };
      return loc;
    },
    // used getPressedPieceByColor insted
    //
    // getPressedPiece(loc) {
    //   for (let i = this.pieces.length - 1; i >= 0; i--) {
    //     if (
    //       loc.offsetX > this.pieces[i].x &&
    //       loc.offsetX < this.pieces[i].x + this.pieces[i].width &&
    //       loc.offsetY > this.pieces[i].y &&
    //       loc.offsetY < this.pieces[i].y + this.pieces[i].height
    //     ) {
    //       return this.pieces[i];
    //     }
    //   }
    //   return null;
    // },
    getPressedPieceByColor(loc, color) {
      for (let i = this.pieces.length - 1; i >= 0; i--) {
        if (this.pieces[i].color === color) return this.pieces[i];
      }
      return null;
    },
  },
};
