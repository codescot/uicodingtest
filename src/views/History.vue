<template>
  <div class="history">
    <label class="euro-amount">{{ euroValue }} EUR</label>
    <div class="subtext">(amount entered in step 1)</div>
    <div v-if="hasHistoricalRates" class="container">
      <div class="exchange-rates">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>{{ currencies[0] }}</th>
              <th>{{ currencies[1] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ratesForDay, i) in sortedHistoricalRates" :key="i">
              <td>{{ ratesForDay.date }}</td>
              <td class="align-right">{{ getValue(ratesForDay, currencies[0]) | rounded }}</td>
              <td class="align-right">{{ getValue(ratesForDay, currencies[1]) | rounded }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <input type="button" value="Reset form" @click.prevent="goBack" />
    </div>
  </div>
</template>

<script>
import { BaseURL, AccessKey } from '@/config.js';
import moment from 'moment';

export default {
  name: 'History',
  props: ['euroValue', 'currencies'],
  data: function() {
    return {
      historicalRates: []
    }
  },
  created() {
    this.getHistoricalRates();
  },
  methods: {
    goBack: function() {
      this.$router.push('/');
    },
    getValue: function(ratesForDay, currency) {
      return ratesForDay.rates[currency] * this.euroValue;
    },
    hasHistoricalRates: function() {
      return this.historicalRates.length !== 0;
    },
    getHistoricalRates: function() {
      const dates = [
        moment(),
        moment().subtract(1, 'days'),
        moment().subtract(2, 'days'),
        moment().subtract(3, 'days'),
        moment().subtract(4, 'days')
      ];

      dates.forEach((date) => {
        const target = `${BaseURL}/${date.format('YYYY-MM-DD')}?access_key=${AccessKey}&base=EUR&symbols=${this.currencies.join()}`;
        fetch(target)
          .then(response => response.json())
          .then(data => { this.historicalRates.push(data); });
      });
    }
  },
  computed: {
    sortedHistoricalRates: function() {
      return this.historicalRates.slice(0).sort(function(a, b) {
        return moment(b.date) - moment(a.date);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
}

thead {
  background-color: #d5d7d9;
}

tbody td {
  padding: 2px 10px;
}

tbody tr:nth-child(odd) {
  background-color: #f5f6f7;
}

tbody tr:nth-child(even) {
  background-color: #eceeee;
}

.euro-amount {
  font-size: 20px;
  font-weight: bold;
}

.subtext {
  font-size: 12px;
  color: #575757;
}

.exchange-rates {
  width: fit-content;

  padding: 10px;
  margin: 15px auto;
}

@media screen and (max-width: 600px) {
  table {
    table-layout: auto;
    width: 250px;
  }
}
</style>
