<template>
  <div class="options">
    <h1>Options page</h1>
    <form class="form" @submit.prevent="setOptions">
      <table class="table">
        <tr>
          <td>Difficulty</td>
          <td>
            <select v-model="difficulty">
              <option v-for="d in difficulties" :key="d" :value="d">{{ d }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Overlay</td>
          <td>
            <input type="checkbox" v-model="overlay" />
          </td>
        </tr>
        <tr>
          <td>Puzzle type</td>
          <td>
            <label v-for="t in puzzleTypes" :key="t">
              {{ t }}
              <input type="radio" name="type" :value="t" v-model="puzzleType" />
            </label>
          </td>
        </tr>
        <tr>
          <td>Sound</td>
          <td>
            <input type="checkbox" v-model="sound" />
          </td>
        </tr>
      </table>

      <div class="form__controls">
        <button class="form__btn" type="submit">Play</button>
        <button class="form__btn" type="button" @click="setDefOptions">By default</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Options",
  data() {
    return {
      difficulties: ["easy", "medium", "hard", "insane"],
      puzzleTypes: ["rect", "angle", "classic"],

      difficulty: "easy",
      overlay: true,
      puzzleType: "classic",
      sound: true,
    };
  },
  computed: {
    optionsByDef() {
      return this.$store.getters.getOptionsByDef;
    },
  },
  methods: {
    setOptions() {
      const options = {
        difficulty: this.difficulty,
        overlay: this.overlay,
        puzzleType: this.puzzleType,
        sound: this.sound,
      };

      this.$store.commit("SET_OPTIONS", options);
      this.$router.push("/gallery");
    },
    setDefOptions() {
      this.difficulty = this.optionsByDef.difficulty;
      this.overlay = this.optionsByDef.overlay;
      this.puzzleType = this.optionsByDef.puzzleType;
      this.sound = this.optionsByDef.sound;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 600px;
  width: 100%;
  margin: 50px auto 0 auto;

  &__controls {
    margin-top: 20px;
  }
  &__btn {
    font-size: 15px;
    padding: 5px 10px;

    margin: 0 10px;
  }
}
.table {
  width: 100%;
  border-collapse: collapse;

  & td {
    padding: 10px 0;
    border: 1px solid #000;

    &:first-child {
      padding-left: 10px;
      text-align: left;
    }
  }
}
</style>
