export const share = {
  methods: {
    getImageUrl(url, width = 185) {
      return `http://image.tmdb.org/t/p/w${width}/${url}`;
    },

    bgcImg(url) {
      return {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${this.getImageUrl(url, 1280)})`
      };
    },
    getYear(date) {
      return date.split("-")[0]
    },
    toNewPage(url) {
      console.log(url)
      window.open(url, "_blank");
    }
  }
}