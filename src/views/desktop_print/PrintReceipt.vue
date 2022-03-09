<template>
  <!-- content -->
  <div class="h-auto w-full px-1 font-mono">
    <p class="text-center uppercase font-bold">{{ receipt.store.name }}</p>
    <p class="text-center">
      {{ receipt.store.address }}
    </p>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <p class="text-center border-gray-500 border-dashed border-b-2"></p>

    <!-- <p class="text-center">- - Receipt - -</p> -->

    <!-- <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p> -->

    <!-- <div class="flex">
      <p>Tanggal</p>
      <p class="flex-grow text-right">
        {{ formatDateTime(receipt.order_date) }}
      </p>
    </div> -->
    <div class="flex justify-center pt-1">
      <p class="text-right">
        {{ formatDateTime(receipt.order_date) }} -
        {{ formatDateTime(receipt.order_date) }}
      </p>
    </div>
    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <div class="flex">
      <p>Nomor</p>
      <p class="flex-grow text-right">{{ receipt.payment.number }}</p>
    </div>
    <div class="flex">
      <p>Kasir</p>
      <p class="flex-grow text-right">{{ receipt.store.cashier_name }}</p>
    </div>
    <div class="flex">
      <p>Customer</p>
      <p class="flex-grow text-right">{{ receipt.customer_name }}</p>
    </div>
    <div class="flex">
      <p>Table</p>
      <p class="flex-grow text-right">{{ receipt.table_number }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div v-for="item in receipt.items" :key="item.key" class="w-full">
      <div class="grid grid-flow-col grid-cols-6">
        <div class="col-span-3 font-bold">
          <p class="truncate ...">{{ item.name }}</p>
        </div>
        <p class="text-right">x{{ item.quantity }}</p>
        <p class="col-span-2 text-right">
          {{ currency(item.total) }}
        </p>
      </div>
      <p>{{ item.variant }}</p>
      <div v-if="item.option != null" class="grid grid-flow-col grid-cols-6">
        <p class="col-span-4">{{ item.option }}</p>
        <p class="col-span-2 text-right">
          {{ item.option_price }}
        </p>
      </div>
      <div
        v-if="item.discount_name != null"
        class="grid grid-flow-col grid-cols-6"
      >
        <p class="col-span-4">{{ item.discount_name }}</p>
        <p class="col-span-2 text-right">
          ({{ currency(item.total_discount) }})
        </p>
      </div>
      <div class="grid grid-flow-col grid-cols-6">
        <p class="col-span-4">{{ item.sales_type }}</p>
      </div>
      <div
        v-for="cost in item.additional_costs"
        :key="cost.key"
        class="grid grid-flow-col grid-cols-6"
      >
        <p class="col-span-4">+ {{ cost.name }}</p>
        <p class="col-span-2 text-right">{{ currency(cost.total) }}</p>
      </div>
      <p class="col-span-4">{{ item.note }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="flex font-bold">
      <p>SUB TOTAL</p>
      <p class="flex-grow text-right">{{ currency(receipt.total_price) }}</p>
    </div>
    <div class="flex font-bold">
      <p>SUB TOTAL DISC</p>
      <p class="flex-grow text-right">
        ({{ currency(receipt.total_discount) }})
      </p>
    </div>
    <div
      v-for="additional in receipt.additional_cost"
      :key="additional.key"
      class="flex font-bold"
    >
      <p>+ {{ additional.name }}</p>
      <p class="flex-grow text-right">{{ currency(additional.total) }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="flex font-bold">
      <p>TOTAL</p>
      <p class="flex-grow text-right">{{ currency(receipt.total) }}</p>
    </div>
    <div class="flex font-bold">
      <p class="uppercase">{{ receipt.payment.type }}</p>
      <p class="flex-grow text-right">
        {{ currency(receipt.payment.received) }}
      </p>
    </div>
    <div class="flex font-bold">
      <p>CHANGE</p>
      <p class="flex-grow text-right">{{ currency(receipt.change) }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <p class="text-center border-gray-500 border-dashed border-b-2"></p>

    <p class="text-center text-sm py-2">N-POS Powered By NULL REBORN</p>
  </div>
</template>

<script>
import moment from "moment";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "PrintReceipt",
  components: {},

  data() {
    return {
      // Temporary data
      // today: moment().format("LLLL"),
      receipt: JSON.parse(localStorage.getItem("receipt")),
    };
  },

  methods: {
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
      localStorage.removeItem("receipt");
    },
  },

  mounted() {
    this.print();
  },
};
</script>
