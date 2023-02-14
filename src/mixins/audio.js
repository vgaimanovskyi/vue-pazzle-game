import pop from "@/assets/pop.mp3";

export default {
  data() {
    return {
      popSound: new Audio(pop),
      audio: new (AudioContext || webkitAudioContext || window.webkitAudioContext)(),
      keys: {
        DO: 261.6,
        RE: 293.7,
        MI: 329.6,
      },
    };
  },
  methods: {
    playNote(key, duration) {
      const osc = this.audio.createOscillator();
      osc.frequency.value = key;
      osc.start(this.audio.currentTime);
      osc.stop(this.audio.currentTime + duration / 1000);

      const envelop = this.audio.createGain();
      osc.connect(envelop);
      osc.type = "triangle";
      envelop.connect(this.audio.destination);
      envelop.gain.setValueAtTime(0, this.audio.currentTime);
      envelop.gain.linearRampToValueAtTime(0.5, this.audio.currentTime + 0.1);
      envelop.gain.linearRampToValueAtTime(0, this.audio.currentTime + duration / 1000);

      setTimeout(() => osc.disconnect(), duration);
    },
    playMelody() {
      if (!this.options.sound) return;
      this.playNote(this.keys.MI, 300);
      setTimeout(() => this.playNote(this.keys.DO, 300), 300);
      setTimeout(() => this.playNote(this.keys.RE, 150), 450);
      setTimeout(() => this.playNote(this.keys.MI, 600), 600);
    },
  },
  mounted() {
    this.popSound.volume = this.options.sound ? 0.1 : 0;
  },
};
