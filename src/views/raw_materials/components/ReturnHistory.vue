<template>
  <!-- Table -->
  <div id="return" class="bg-white h-5/6 overflow-y-auto pb-8 hidden">
    <div
      v-if="returnHistory.length == 0"
      class="h-4/6 w-full flex items-center justify-center"
    >
      <div class="text-center text-gray-400 text-sm">
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p>Data Tidak Ditemukan untuk Periode :</p>
        <p class="underline">
          {{ formatDateInIDN(datePeriod.from) }} s/d
          {{ formatDateInIDN(datePeriod.to) }}
        </p>
        <p class="mt-2">Silahkan coba dengan periode yang lain</p>
      </div>
    </div>
    <table v-if="returnHistory.length != 0" class="min-w-max w-full table-auto">
      <thead class="sticky top-0 z-10">
        <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">
            nomor ({{ returnHistory.length }})
          </th>
          <th class="py-3 px-6 text-left">tanggal</th>
          <th class="py-3 px-6 text-left">item</th>
          <th class="py-3 px-6 text-left">catatan</th>
        </tr>
      </thead>

      <tbody class="text-gray-800 text-sm font-light">
        <tr
          v-for="data in returnHistory"
          :key="data.key"
          class="border-b border-gray-200 hover:bg-gray-100 align-top"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ data.number }}
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ formatDateInIDN(data.transaction_date) }}
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <table class="w-full">
              <tbody v-for="item in data.items" :key="item.key">
                <tr>
                  <td class="font-bold"># {{ item.name }}</td>
                  <td>-{{ item.quantity }}</td>
                  <td>{{ item.unit }}</td>
                </tr>
                <tr v-if="item.note != null">
                  <td colspan="3" class="">{{ "Note : " + item.note }}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ data.note }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/id";

export default {
  name: "ReturnHistory",
  props: {
    datePeriod: Object,
    returnHistory: Array,
    showReturn: Boolean,
  },

  watch: {
    showReturn: function (newVal, oldVal) {
      if (this.showReturn === true) {
        this.show();
      } else {
        this.hide();
      }
    },
  },

  methods: {
    show() {
      let component = document.getElementById("return");
      component.style.display = "block";
    },
    hide() {
      let component = document.getElementById("return");
      component.style.display = "none";
    },
    formatDateInIDN(date) {
      return moment(date).format("dddd, LL");
    },
  },
};
</script>
