<template>
  <div class="modal-layout">
    <div class="modal">
      <div class="modal__body">
        <div class="modal__text"><b>Your result</b></div>
        <table class="table">
          <tr>
            <td class="table__td"><b>Time:</b></td>
            <td>{{ time }}</td>
          </tr>
          <tr>
            <td class="table__td"><b>Difficulty:</b></td>
            <td>{{ difficulty }}</td>
          </tr>
        </table>
        <button class="modal__btn" type="button" @click="newGame">New Game</button>
        <button class="modal__btn" type="button" @click="playAgain">Play again</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      require: true,
    },
    difficulty: {
      type: String,
      require: true,
    },
  },
  methods: {
    newGame() {
      this.$router.push("/");
    },
    playAgain() {
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  position: relative;
  width: 300px;
  min-height: 150px;
  background: #fff;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }
  &__btn {
    font-size: 15px;
    padding: 5px 10px;
    margin: 0 10px;
    cursor: pointer;
  }
}
.table {
  margin: 0 auto 10px auto;

  &__td {
    text-align: left;
  }
}
</style>
