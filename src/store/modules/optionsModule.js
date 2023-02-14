export const optionsModule = {
  state() {
    return {
      optionsByDef: {
        difficulty: "easy",
        overlay: true,
        puzzleType: "classic",
        sound: true,
      },
      options: {
        difficulty: "easy",
        overlay: true,
        puzzleType: "classic",
        sound: true,
      },
    };
  },
  mutations: {
    SET_OPTIONS(state, options) {
      state.options = options;
    },
  },
  getters: {
    getOptions: (state) => state.options,
    getOptionsByDef: (state) => state.optionsByDef,
  },
  // namespaced: true,
};
