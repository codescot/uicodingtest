<template>
  <div class="home">
    <div>
      <label>Enter a value for EUR</label>
      <br />
      <input type="number" min="0" step=".01" v-model="euroValue" placeholder="100.12" />
    </div>
    <div v-if="exchangeRates.success" class="container">
      <label>Select two...</label>
      <div class="exchange-rates">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="([key, value], i) in Object.entries(exchangeRates.rates)"
              :value="key"
              :key="i"
              @click.prevent="toggleRowSelected"
              :data-currency="key"
            >
              <td class="currency">{{ key }}</td>
              <td class="align-right">{{ value | rounded }}</td>
              <td class="align-right">{{ euroValue * value | rounded }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <input type="button" value="Compare" @click.prevent="showHistory" />
      <div v-if="showError" class="error">Select two before continuing.</div>
    </div>
  </div>
</template>

<script>
import { BaseURL, AccessKey, Symbols } from '@/config.js';

export default {
  name: 'Home',
  components: {},
  data: function() {
    return {
      showError: false,
      euroValue: 1,
      exchangeRates: {
        success: false
      },
      selectedCurrencies: []
    };
  }, 
  created() {
    this.latest();
  },
  methods: {
    showHistory: function() {
      if (this.selectedCurrencies.length < 2) {
        this.showError = true;
        return;
      }

      this.showError = false;
      this.$router.push({ name: 'History', params: { euroValue: this.euroValue, currencies: this.selectedCurrencies } });
    },
    toggleRowSelected: function(event) {
      const row = event.currentTarget;
      if (row.classList.contains('selected')) {
        row.classList.remove('selected');

        const selectedCurrency = row.getAttribute('data-currency');
        this.selectedCurrencies = this.selectedCurrencies.filter((value) => value !== selectedCurrency);
      } else if (this.selectedCurrencies.length < 2) {
        row.classList.add('selected');

        const selectedCurrency = row.getAttribute('data-currency');
        this.selectedCurrencies.push(selectedCurrency);
      }
    },
    latest: function() {
      const target = `${BaseURL}/latest?access_key=${AccessKey}&symbols=${Symbols}`;

      fetch(target)
        .then(response => response.json())
        .then(data => this.exchangeRates = data);
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
}

tbody tr:hover {
  background-color: #d5d7d9;
  cursor: pointer;
}

td {
  padding: 2px 10px;
}

.container {
  margin-top: 10px;
}

.exchange-rates {
  width: fit-content;

  padding: 10px;
  margin: 15px auto;

  border: thin solid #d5d7d9;
  border-radius: 4px;
}

.currency {
  width: 10px;
}

.selected {
  background-color: #d5d7d9;
}

.error {
  margin-top: 5px;
  color: #bb0000;
}

@media screen and (max-width: 600px) {
  table {
    table-layout: auto;
    width: 250px;
  }

  td {
    padding: 4px 10px;
  }
}
</style>
