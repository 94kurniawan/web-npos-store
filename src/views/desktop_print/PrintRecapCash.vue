<template>
  <!-- content -->
  <div class="h-auto w-full px-1 font-mono">
    <!-- <div class="bg-white px-3 py-3 h-auto shadow-xl"> -->
    <p class="text-center font-bold uppercase">
      {{ recapCash.user_info.store_name }}
    </p>
    <p class="text-center">{{ recapCash.user_info.store_address }}</p>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <p class="text-center border-gray-500 border-dashed border-b-2"></p>

    <div class="flex">
      <p>Waktu Cetak</p>
      <p class="text-right flex-grow">
        {{ formatDateTime(recapCash.access_time) }}
      </p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="flex">
      <p>Periode</p>
      <p
        v-if="recapCash.date.from != recapCash.date.to"
        class="text-right flex-grow"
      >
        {{ formatDateInIDN(recapCash.date.from) }} -
        {{ formatDateInIDN(recapCash.date.to) }}
      </p>
      <p
        v-if="recapCash.date.from === recapCash.date.to"
        class="text-right flex-grow"
      >
        {{ formatDateInIDN(recapCash.date.from) }}
      </p>
    </div>
    <div class="grid grid-cols-2">
      <p>Kasir</p>
      <p class="text-right">{{ recapCash.user_info.name }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="flex items-center content-center py-3">
      <p>MODAL</p>
      <p class="text-right flex-grow">
        {{ currency(recapCash.total_patty_cash) }}
      </p>
    </div>
    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <p class="text-center">PENJUALAN</p>
    <p class="text-sm">Type Pembayaran:</p>
    <div
      v-for="sales in recapCash.total_sales"
      :key="sales.key"
      class="grid grid-flow-col grid-cols-6 font-bold"
    >
      <p class="col-span-4 uppercase">{{ sales.name }}</p>
      <p class="col-span-2 text-right">
        {{ currency(sales.total) }}
      </p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="grid grid-flow-col grid-cols-6 font-bold">
      <p class="col-span-4 uppercase text-right">Total</p>
      <p class="col-span-2 text-right">{{ currency(recapCash.total.sales) }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <p class="text-center">KAS KELUAR</p>
    <p class="text-sm">rincian (cash):</p>
    <div
      v-for="(cashOut, index) in recapCash.cash_outs"
      :key="cashOut.key"
      class="grid grid-flow-col grid-cols-6 text-sm"
    >
      <p class="col-span-4 capitalize ml-2">
        {{ ++index }}. {{ cashOut.note }}
      </p>
      <p class="col-span-2 text-right">({{ currency(cashOut.amount) }})</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="grid grid-flow-col grid-cols-6 font-bold">
      <p class="col-span-4 uppercase text-right">Total</p>
      <p class="col-span-2 text-right">
        ({{ currency(recapCash.total.cash_outs) }})
      </p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="grid grid-flow-col grid-cols-6 font-bold">
      <p class="col-span-4 uppercase">SISA KAS (cash)</p>
      <p class="col-span-2 text-right">{{ currency(recapCash.total.cash) }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="grid grid-flow-col grid-cols-6 font-bold">
      <p class="col-span-4 uppercase">SISA MODAL</p>
      <p class="col-span-2 text-right">
        {{ currency(recapCash.total.patty_cash) }}
      </p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <p class="text-center border-gray-500 border-dashed border-b-2"></p>

    <p class="text-center text-sm py-2">N-POS Powered By NULL REBORN</p>

    <!-- </div> -->
  </div>
</template>

<script>
import moment from "moment";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "PrintRecapCash",
  components: {},

  data() {
    return {
      // Temporary data
      recapCash: JSON.parse(localStorage.getItem("recapCash")),
    };
  },

  methods: {
    formatDateInIDN(date) {
      return moment(date).format("ll");
    },
    formatDateTime(date) {
      return moment(date).format("LL, h:mm:ss");
    },
    currency(number) {
      return numberFormat.currency(number);
    },
    print() {
      setTimeout(() => {
        window.print();
        window.close();
      }, 700);
      localStorage.removeItem("recapCash");
    },
  },

  mounted() {
    this.print();
  },
};
</script>
