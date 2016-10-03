<template>
  <div class="c-account">
      <div class="c-transaction-list-container">
        <div class="c-account-header">
          <p v-if="balance.loading">Loading...</p>
          <template v-else>
            <div class="grid">
              <div class="grid__item one-half c-account-header__amount">
                <currency :value="balance.data.balance / 100" split :currency="balance.data.currency"></currency>
                <div class="c-account-header__tag">Card balance</div>
              </div><!--
           --><div class="grid__item one-half u-text-align-right c-account-header__amount">
                <currency :value="balance.data.spend_today / 100" split :currency="balance.data.currency"></currency>
                <div class="c-account-header__tag">Spent today</div>
              </div>
            </div>
          </template>
        </div>
        <div class="c-another-container">
          <router-view></router-view>
        </div>
      </div><!--
   --><div class="c-transaction-view">
        <p v-if="transaction.loading">Loading...</p>
        <template v-else>
          <div v-if="!transaction.data.id" class="c-transaction-select">
            <p>No transaction selected</p>
          </div>
          <template v-else>
            <div class="map" ref="map"></div>
            <div class="c-transaction-view__image-container" :style="imageStyle">
              <span v-if="transaction.data.is_load">+</span>
            </div>
            <h1 class="c-transaction-view__heading">{{ title }}</h1>
            <p v-if="transaction.data.merchant.address" class="c-transaction-view__address">
              <a :href="'http://maps.google.com/?ll=' + transaction.data.merchant.address.latitude + ',' + transaction.data.merchant.address.longitude" target="_blank">{{ transaction.data.merchant.address.short_formatted }}</a>
            </p>
            <div class="c-transaction-view__amount">
              <currency :value="transaction.data.amount / 100" :currency="transaction.data.currency"></currency>
            </div>
          </template>
        </template>
      </div>
  </div>
</template>

<script>
import Currency from '../common/Currency.vue';

export default {
  components: {
    Currency,
  },
  computed: {
    balance() {
      return this.$store.state.balance;
    },
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
  created() {
    this.$store.dispatch('retrieveBalance', this.$route.params.id);
  },
  watch: {
    ['transaction.data']() {
      this.$nextTick(() => {
        if (!this.transaction.data.merchant) {
          return;
        }

        var myLatLng = {
          lat: this.transaction.data.merchant.address.latitude,
          lng: this.transaction.data.merchant.address.longitude,
        };

        var map = new google.maps.Map(this.$refs.map, {
          zoom: 14,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
        });
      });
    },
  },
}
</script>

<style lang="scss">
.c-account-header {
  background: #14233c;
  color: #fff;
  padding: 20px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 105px;
}

.c-transaction-view {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  text-align: center;
}

.c-another-container {
  border-right: 1px solid #e0e0e0;
  position: absolute;
  top: 105px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow-y: auto;
}

.c-transaction-list-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
}

.c-account-header__amount {
  font-size: 38px;
  line-height: 38px;
  font-weight: 300;
}

.c-account-header__tag {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  text-transform: uppercase;
  line-height: 13px;
  margin-top: 6px;
}

.c-transaction-select {
  justify-content: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;

  p {
    font-size: 26px;
    font-weight: 300;
    color: #bbb;
    margin: 0;
    -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  }
}

.map {
  width: 100%;
  height: 200px;
}

.c-transaction-view__heading {
  font-weight: 300;
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 30px;
  line-height: 26px;
}

.c-transaction-view__address {
  font-size: 13px;
}

.c-transaction-view__image-container {
  padding-top: 16px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  display: inline-block;
  background-color: #ddd;
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background-position: center;
  background-size: cover;
  margin-top: -25px;
  position: relative;

  .c-transaction-item--top-up & {
    background-color: #43af7a;
  }
}

.c-transaction-view__amount {
  font-size: 38px;
  line-height: 38px;
  font-weight: 300;
  margin-top: 30px;
}
</style>
