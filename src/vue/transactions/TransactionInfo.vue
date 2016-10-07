<template>
  <div class="c-transaction-info">
    <transaction-select v-if="!transaction.data.id"></transaction-select>
    <div v-else class="c-transaction-info__details">
      <div class="c-transaction-info__map" ref="map"></div>
      <div class="c-transaction-info__image-container" :style="imageStyle">
        <span v-if="transaction.data.is_load">+</span>
      </div>
      <h1 class="c-transaction-info__heading">{{ title }}</h1>
      <p v-if="transaction.data.merchant.address" class="c-transaction-info__address">
        <a :href="'http://maps.google.com/?ll=' + transaction.data.merchant.address.latitude + ',' + transaction.data.merchant.address.longitude" target="_blank">{{ transaction.data.merchant.address.short_formatted }}</a>
      </p>
      <div class="c-transaction-info__amount">
        {{ transaction.data.amount / 100 | currency(transaction.data.currency) }}
      </div>
    </div>
  </div>
</template>

<script>
import TransactionSelect from './TransactionSelect.vue';

export default {
  components: {
    TransactionSelect,
  },
  computed: {
    transaction() {
      return this.$store.state.transaction;
    },
    title() {
      if (this.transaction.is_load) {
        return this.transaction.data.description;
      }

      if (this.transaction.data.merchant) {
        return this.transaction.data.merchant.name;
      }

      if (this.transaction.data.counterparty) {
        return this.transaction.data.counterparty.name;
      }

      return this.transaction.data.description;
    },
    imageStyle() {
      if (!this.transaction.data.merchant) {
        return {};
      }

      return {
        backgroundImage: `url(${this.transaction.data.merchant.logo})`,
      };
    },
  },
  watch: {
    'transaction.data': function() {
      this.$nextTick(() => {
        let latitude;
        let longitude;
        let map;
        if (!this.transaction.data.merchant) {
          return;
        }

        ({ latitude, longitude } = this.transaction.data.merchant.address);
        map = new google.maps.Map(this.$refs.map, {
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 14,
        });
        new google.maps.Marker({
          map: map,
          position: {
            lat: latitude,
            lng: longitude,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';

.c-transaction-info {
  height: 100%;
}

.c-transaction-info__map {
  width: 100%;
  height: 200px;
}

.c-transaction-info__heading {
  font-weight: 300;
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 30px;
  line-height: 26px;
}

.c-transaction-info__address {
  font-size: 13px;
}

.c-transaction-info__image-container {
  padding-top: 16px;
  text-align: center;
  color: $white;
  font-size: 20px;
  display: inline-block;
  background-color: $gallery;
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background-position: center;
  background-size: cover;
  margin-top: -25px;
  position: relative;
}

.c-transaction-info__amount {
  font-size: 38px;
  line-height: 38px;
  font-weight: 300;
  margin-top: 30px;
}
</style>
