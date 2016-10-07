<template>
  <div class="c-transaction-map">
    <div class="c-transaction-map__map" ref="map"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.$nextTick(() => {
      const position = {
        lat: this.latitude,
        lng: this.longitude,
      };
      this.map = new google.maps.Map(this.$refs.map, {
        center: position,
        disableDefaultUI: true,
        scrollwheel: false,
        zoom: this.zoom,
        zoomControl: true,
      });
      this.marker = new google.maps.Marker({
        map: this.map,
        position,
      });
    });
  },
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  props: {
    latitude: {
      required: true,
    },
    longitude: {
      required: true,
    },
    zoom: {
      default: 14,
      type: Number,
    },
  },
};
</script>

<style lang="scss">
.c-transaction-map__map {
  height: 200px;
  width: 100%;
}
</style>
