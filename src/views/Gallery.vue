<template>
  <div>
    <h1>Gallery page</h1>

    <div class="gallery" v-if="!isEmptyGallery">
      <div class="gallery__col" v-for="image in gallery" :key="image.id">
        <div class="image" @click="selectImage(image)">
          <button class="image__icon" type="button" @click.stop="openModal(image)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
              height="20"
              fill="#fff"
            >
              <path
                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7c-12.23-91.55-87.28-166-178.9-177.6c-136.2-17.24-250.7 97.28-233.4 233.4c11.6 91.64 86.07 166.7 177.6 178.9c53.81 7.191 104.3-6.235 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 .0003C515.9 484.7 515.9 459.3 500.3 443.7zM288 232H231.1V288c0 13.26-10.74 24-23.1 24C194.7 312 184 301.3 184 288V232H127.1C114.7 232 104 221.3 104 208s10.74-24 23.1-24H184V128c0-13.26 10.74-24 23.1-24S231.1 114.7 231.1 128v56h56C301.3 184 312 194.7 312 208S301.3 232 288 232z"
              />
            </svg>
          </button>
          <img class="image__img" :src="image.previewURL" :alt="`image-${image.id}`" />
        </div>
      </div>
    </div>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMoreImages" class="observer"></div>

    <transition name="fade">
      <Modal v-if="modal" :zoomImg="image" @close="closeModal" />
    </transition>
    <transition name="fade">
      <Confirm v-if="confirm" @accept="acceptImage" @close="confirm = false">
        Confirm this image?
      </Confirm>
    </transition>
  </div>
</template>

<script>
import Modal from "@/components/zoomImage";
import Confirm from "@/components/confirmModal";

export default {
  name: "Gallery",
  components: { Modal, Confirm },
  data() {
    return {
      modal: false,
      confirm: false,
      image: null,

      currentPage: 1,
    };
  },
  computed: {
    isEmptyGallery() {
      return this.$store.getters.isEmptyGallery;
    },
    gallery() {
      return this.$store.getters.getGallery;
    },
  },
  methods: {
    openModal(img) {
      this.image = img;
      this.modal = true;
    },
    closeModal() {
      this.zoomImg = null;
      this.modal = false;
    },
    selectImage(img) {
      this.image = img;
      this.confirm = true;
    },
    acceptImage() {
      this.$store.commit("SET_IMAGE", this.image);
      this.confirm = false;
      this.$router.push("/game");
    },
    async loadMoreImages() {
      try {
        this.currentPage += 1;
        await this.$store.dispatch("fetchImages", this.currentPage);
      } catch (error) {}
    },
  },
  async mounted() {
    if (this.isEmptyGallery) {
      try {
        await this.$store.dispatch("fetchImages", this.currentPage);
      } catch (error) {}
    }
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  &__col {
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
}
.image {
  max-width: 150px;
  width: 100%;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 15px yellow;
  }
  &__icon {
    position: absolute;
    top: 0;
    right: 0;

    display: block;
    outline: none;
    border: none;
    border-bottom-left-radius: 50%;
    padding: 2px;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &:hover,
    &:focus {
      & svg {
        fill: rgb(218, 214, 214);
      }
    }
  }
  &__img {
    display: block;
    margin: 0 auto;
  }
}
</style>
