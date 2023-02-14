export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      time: null,
    };
  },
  methods: {
    updateTime() {
      const now = new Date().getTime();
      if (this.startTime !== null) {
        if (this.endTime !== null) {
          this.time = this.formatTime(this.endTime - this.startTime);
        } else {
          this.time = this.formatTime(now - this.startTime);
        }
      }
    },
    formatTime(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      const s = Math.floor(seconds % 60);
      const m = Math.floor((seconds % (60 * 60)) / 60);
      const h = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));

      let formattedTime = h.toString().padStart(2, "0");
      formattedTime += ":";
      formattedTime += m.toString().padStart(2, "0");
      formattedTime += ":";
      formattedTime += s.toString().padStart(2, "0");

      return formattedTime;
    },
  },
};
