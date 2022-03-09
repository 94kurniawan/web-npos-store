<template>
  <!-- content -->
  <div class="h-auto w-full px-1 font-mono">
    <p class="text-center uppercase font-bold">{{ user.info.store_name }}</p>
    <p class="text-center">
      {{ user.info.store_address }}
    </p>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>
    <p class="text-center border-gray-500 border-dashed border-b-2"></p>

    <p class="text-center">- - BILL - -</p>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div class="flex">
      <p>Tanggal</p>
      <p v-if="bill.order_date != ''" class="flex-grow text-right">
        {{ formatDateTime(bill.order_date) }}
      </p>
      <p v-if="bill.order_date == ''" class="flex-grow text-right">
        {{ today }}
      </p>
    </div>
    <div class="flex">
      <p>Nomor</p>
      <p class="flex-grow text-right">{{ bill.order_number }}</p>
    </div>
    <div class="flex">
      <p>Kasir</p>
      <p class="flex-grow text-right">{{ user.info.name }}</p>
    </div>
    <div class="flex">
      <p>Customer</p>
      <p class="flex-grow text-right">{{ bill.customer_name }}</p>
    </div>
    <div class="flex">
      <p>Table</p>
      <p class="flex-grow text-right">{{ bill.table_number }}</p>
    </div>

    <p
      class="text-center border-gray-500 border-dashed border-b-2 mt-1 mb-0.5"
    ></p>

    <div v-for="item in bill.items" :key="item.key" class="w-full">
      <div class="grid grid-flow-col grid-cols-6">
        <div class="col-span-3 font-bold">
          <p class="truncate ...">{{ item.name }}</p>
        </div>
        <p class="text-right">x{{ item.quantity }}</p>
        <p class="col-span-2 text-right">
          {{ currency(item.quantity * item.price) }}
        </p>
      </div>
      <p>{{ item.variant.name }}</p>
      <div class="grid grid-flow-col grid-cols-6">
        <p class="col-span-4">{{ item.option.name }}</p>
        <p v-if="item.option.price != 0" class="col-span-2 text-right">
          {{ item.option.price }}
        </p>
      </div>
      <div
        v-if="
          item.discount.length != 0 && item.discount.percentage != undefined
        "
        class="grid grid-flow-col grid-cols-6"
      >
        <p class="col-span-4">{{ item.discount.name }}</p>
        <p class="col-span-2 text-right">
          ({{
            currency(item.discount.percentage * item.quantity * item.price)
          }})
        </p>
      </div>
      <div class="grid grid-flow-col grid-cols-6">
        <p class="col-span-4">{{ item.sales_type.name }}</p>
      </div>
      <div
        v-for="cost in item.additional_cost"
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
      <p class="flex-grow text-right">{{ currency(bill.sub_total) }}</p>
    </div>
    <div class="flex font-bold">
      <p>SUB TOTAL DISC</p>
      <p class="flex-grow text-right">({{ currency(bill.sub_total_disc) }})</p>
    </div>
    <div
      v-for="additional in bill.additionalCost"
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
      <p class="flex-grow text-right">{{ currency(bill.total) }}</p>
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
  name: "PrintBill",
  components: {},

  data() {
    return {
      // Temporary data
      today: moment().format("LL, h:mm:ss"),
      user: JSON.parse(localStorage.getItem("user")),
      bill: JSON.parse(localStorage.getItem("bill")),
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
      localStorage.removeItem("bill");
    },
  },

  mounted() {
    this.print();
  },
};
</script>
