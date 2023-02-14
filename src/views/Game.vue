<template>
  <div class="page">
    <div id="time">{{ time }}</div>
    <h1>Game page</h1>
    <hr />
    <div v-if="!isImageLoading">
      <canvas ref="myCanvas" class="canvas"> </canvas>
      <canvas ref="helperCanvas" class="helperCanvas"> </canvas>
    </div>
    <div v-else>Идет загрузка...</div>

    <transition name="fade">
      <EndGame
        v-if="stopGame"
        :time="time"
        :difficulty="options.difficulty"
        @refresh="refreshGame"
      />
    </transition>
  </div>
</template>

<script>
import buildPiece from "@/utils/buildPiece";
import { getRandomColor } from "@/utils/utils";
import controls from "@/mixins/controls";
import timer from "@/mixins/timer";
import audio from "@/mixins/audio";
import EndGame from "../components/endGame.vue";

export default {
  mixins: [controls, timer, audio],
  components: { EndGame },
  name: "Game",
  data() {
    return {
      canvas: null,
      context: null,
      helperCanvas: null,
      helperContex: null,
      scaler: 0.8,
      image: new Image(),
      isImageLoading: true,
      pieces: [],
      selectedPiece: null,
      size: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rows: 3,
        columns: 3,
      },
      stopGame: false,
    };
  },
  computed: {
    options() {
      return this.$store.getters.getOptions;
    },
    isImage() {
      return this.$store.getters.isImage;
    },
    imageSrc() {
      return this.$store.getters.getImageSrc;
    },
  },
  methods: {
    initializePieces(rows, cols) {
      this.size.rows = rows;
      this.size.columns = cols;

      this.pieces = [];
      const uniqueRandomColors = [];
      for (let i = 0; i < this.size.rows; i++) {
        for (let j = 0; j < this.size.columns; j++) {
          let color = getRandomColor();
          while (uniqueRandomColors.includes(color)) {
            color = getRandomColor();
          }

          this.pieces.push(buildPiece(i, j, this.size, color));
        }
      }

      // init puzzle tabs
      if (this.options.puzzleType !== "rect") {
        this.initPuzzleTabs();
      }
    },
    initPuzzleTabs() {
      let cnt = 0;
      for (let i = 0; i < this.size.rows; i++) {
        for (let j = 0; j < this.size.columns; j++) {
          const piece = this.pieces[cnt];
          if (i === this.size.rows - 1) {
            piece.bottom = null;
          } else {
            const sgn = Math.random() - 0.5 < 0 ? -1 : 1;
            piece.bottom = sgn * (Math.random() * 0.4 + 0.3);
          }

          if (j === this.size.columns - 1) {
            piece.right = null;
          } else {
            const sgn = Math.random() - 0.5 < 0 ? -1 : 1;
            piece.right = sgn * (Math.random() * 0.4 + 0.3);
          }

          if (j === 0) {
            piece.left = null;
          } else {
            piece.left = -this.pieces[cnt - 1].right;
          }

          if (i === 0) {
            piece.top = null;
          } else {
            piece.top = -this.pieces[cnt - this.size.columns].bottom;
          }
          cnt++;
        }
      }
    },
    randomizePieces() {
      this.pieces.forEach((piece) => {
        const loc = {
          x: Math.random() * (this.canvas.width - piece.width),
          y: Math.random() * (this.canvas.height - piece.height),
        };
        piece.x = loc.x;
        piece.y = loc.y;
        piece.correct = false;
      });
    },
    handleResize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight - this.canvas.offsetTop;
      this.helperCanvas.width = window.innerWidth;
      this.helperCanvas.height = window.innerHeight - this.canvas.offsetTop;

      const resizer =
        this.scaler *
        Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
      this.size.width = resizer * this.image.width;
      this.size.height = resizer * this.image.height;
      this.size.x = this.canvas.width / 2 - this.size.width / 2;
      this.size.y = this.canvas.height / 2 - this.size.height / 2;
    },
    updateGame() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.helperContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.options.overlay) {
        this.context.globalAlpha = 0.5;
        this.drawContextImage();
        this.context.globalAlpha = 1;
      } else {
        this.context.rect(this.size.x, this.size.y, this.size.width, this.size.height);
        this.context.stroke();
      }

      if (!this.stopGame) {
        this.pieces.forEach((piece) => {
          piece.draw(this.context, this.image, this.options.puzzleType);
          piece.draw(this.helperContext, false, this.options.puzzleType);
        });
      } else {
        this.drawContextImage();
      }
      this.updateTime();
      window.requestAnimationFrame(this.updateGame);
    },
    drawContextImage() {
      this.context.drawImage(
        this.image,
        this.size.x,
        this.size.y,
        this.size.width,
        this.size.height
      );
    },
    isComplete() {
      for (let i = 0; i < this.pieces.length; i++) {
        if (this.pieces[i].correct === false) return false;
      }
      return true;
    },
    restart() {
      this.startTime = new Date().getTime();
      this.endTime = null;
      this.randomizePieces();
    },
    setDifficulty() {
      const diff = this.options.difficulty;
      switch (diff) {
        case "easy":
          this.initializePieces(3, 3);
          break;
        case "medium":
          this.initializePieces(5, 5);
          break;
        case "hard":
          this.initializePieces(10, 10);
          break;
        case "insane":
          this.initializePieces(40, 25);
          break;
      }
    },
    endGame() {
      this.playMelody();

      this.context.drawImage(
        this.image,
        this.size.x,
        this.size.y,
        this.size.width,
        this.size.height
      );
      this.stopGame = true;
    },

    refreshGame() {
      this.stopGame = false;
      this.restart();
    },
  },
  async mounted() {
    if (!this.isImage) {
      this.$router.push("/");
      return;
    }
    this.image.src = await this.imageSrc;
    this.image.onload = () => {
      this.isImageLoading = false;

      this.$nextTick(() => {
        this.canvas = this.$refs.myCanvas;
        this.context = this.canvas.getContext("2d");
        this.helperCanvas = this.$refs.helperCanvas;
        this.helperContext = this.helperCanvas.getContext("2d");

        this.addEventListeners();

        this.handleResize();
        this.setDifficulty();
        // this.initializePieces(this.size.rows, this.size.columns);
        this.randomizePieces();

        this.updateGame();
        this.restart();
      });
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  overscroll-behavior: none;
}
#time {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.helperCanvas {
  position: absolute;
  top: 0;
  left: 0;

  width: 15%;
  height: 15%;
}
</style>
