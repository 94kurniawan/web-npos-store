<template>
  <div
    @click="closeModalWindow()"
    class="
      hidden
      fixed
      inset-0
      bg-gray-600 bg-opacity-50
      overflow-y-auto
      h-full
      w-full
    "
    id="modal-saved-orders-list"
  >
    <!--modal content-->
    <div
      class="
        relative
        mx-auto
        top-10
        border
        w-4/6
        h-auto
        pb-10
        shadow-lg
        rounded-md
        bg-white
        overflow-y-auto
      "
    >
      <div class="flex justify-center py-3 shadow-md sticky top-0 bg-white">
        <p class="px-4 my-auto uppercase">Daftar Pesanan Disimpan</p>
      </div>
      <table class="h-full min-w-max w-full table-auto">
        <thead class="sticky top-0 z-10">
          <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">
              Order Time ({{ savedOrdersList.length }})
            </th>
            <th class="py-3 px-6 text-left">Table</th>
            <th class="py-3 px-6 text-left">Customer</th>
            <th class="py-3 px-6 text-right">TOTAL</th>
          </tr>
        </thead>

        <tbody v-if="savedOrdersList.length == 0">
          <tr>
            <td colspan="6">
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
                <p>Tidak ada pesanan disimpan</p>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody
          v-if="savedOrdersList.length != 0"
          class="text-gray-800 text-sm font-light"
        >
          <tr
            @click="selectOrder(data)"
            v-for="data in savedOrdersList"
            :key="data.key"
            class="
              border-b border-gray-200
              hover:bg-gray-100
              align-top
              odd:bg-gray-50
            "
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.saved_time }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.order.table_number }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ data.order.customer_name }}
            </td>
            <td class="py-3 px-6 text-right whitespace-nowrap">
              {{ currency(totalPay(data)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CurrencyInput from "@/views/components/CurrencyInput.vue";
import * as numberFormat from "@/custom_package/number.js";

export default {
  name: "ModalSavedOrdersList",
  components: {
    CurrencyInput,
  },
  props: {
    savedOrdersList: Array,
  },

  methods: {
    currency(number) {
      return numberFormat.currency(number);
    },
    totalPay(data) {
      let total = 0;
      data.order.items.forEach((item) => {
        total += item.sub_total;
      });
      return total;
    },
    closeModalWindow() {
      let modal = document.getElementById("modal-saved-orders-list");
      if (window.event.target == modal) {
        modal.style.display = "none";
      }
    },
    selectOrder(data) {
      this.$emit("select-order", data);
      let modal = document.getElementById("modal-saved-orders-list");
      modal.style.display = "none";
    },
  },
};
</script>