<template>
  <div class="home">
    <h1>Home page</h1>
    <img src="../assets/puzzle.png" alt="logo" class="logo" />
    <div class="controls">
      <router-link to="/gallery">
        <button class="btn" type="button">Play</button>
      </router-link>
      <router-link to="/options">
        <button class="btn" type="button">Options</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 400px;
  margin: 0 auto;
}
.controls {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.btn {
  font-size: 15px;
  padding: 5px 10px;
  margin: 0 20px;
}
</style>
