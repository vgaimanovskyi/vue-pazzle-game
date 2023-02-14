export const imageModule = {
  state() {
    return {
      gallery: [],
      image: null,
    };
  },
  mutations: {
    SET_GALLERY(state, images) {
      state.gallery = [...state.gallery, ...images];
    },
    SET_IMAGE(state, image) {
      state.image = image;
    },
  },
  actions: {
    async fetchImages({ commit }, currentPage) {
      const url = "https://pixabay.com/api/";
      const key = process.env.VUE_APP_PIXABAY;
      try {
        const res = await fetch(`${url}?key=${key}&page=${currentPage}&per_page=50`);
        const data = await res.json();
        commit("SET_GALLERY", data.hits);
        //
        //
        // commit("SET_IMAGE");
        //
        //
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  getters: {
    isEmptyGallery: (state) => !state.gallery.length,
    getGallery: (state) => state.gallery,
    isImage: (state) => Boolean(state.image),
    getImageSrc: (state) => state.image.largeImageURL,
  },
  // namespaced: true,
};
