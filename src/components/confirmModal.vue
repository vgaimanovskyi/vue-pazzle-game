<template>
  <div class="modal-layout" @click="$emit('close')">
    <div class="modal">
      <div class="modal__body">
        <div class="modal__text">
          <slot></slot>
        </div>
        <button class="modal__btn" type="button" @click="$emit('accept')">Yes</button>
        <button class="modal__btn" type="button" @click="$emit('close')">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
    font-size: 15px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__btn {
    font-size: 15px;
    padding: 5px 10px;
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
