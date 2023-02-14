<template>
  <div class="modal-layout">
    <div class="modal">
      <button class="modal__close" type="button" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="50" height="50">
          <path
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
          />
        </svg>
      </button>

      <img :src="innerImageSrc()" :alt="`image-${zoomImg.id}`" class="modal__image" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["zoomImg"],
  data() {
    return {
      showLargeImage: false,
    };
  },
  methods: {
    innerImageSrc() {
      return this.showLargeImage ? this.zoomImg.largeImageURL : this.zoomImg.previewURL;
    },
    async largeImageLoading() {
      const image = new Image();
      image.src = await this.zoomImg.largeImageURL;
      image.onload = () => (this.showLargeImage = true);
    },
  },
  async mounted() {
    await this.largeImageLoading();
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

  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  position: relative;
  max-width: 1200px;
  width: 100%;

  &__close {
    position: absolute;
    top: 0;
    right: 0;

    display: block;
    padding: 0;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    outline: none;
    cursor: pointer;

    & svg {
      display: block;
    }
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.8);
    }
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
    max-height: 80vh;
  }
}
</style>
