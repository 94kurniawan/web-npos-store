<template>
  <div class="h-full px-3 col-span-8 bg-white overflow-y-auto">
    <p class="text-center p-2 uppercase font-bold">Laporan Penjualan</p>

    <table class="h-full min-w-max w-full table-auto">
      <thead class="sticky top-0">
        <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">item ({{ salesReport.length }})</th>
          <!-- <th class="py-3 px-6 text-left">Category</th> -->
          <th class="py-3 px-6 text-right">Penjualan</th>
        </tr>
      </thead>

      <tbody v-if="salesReport.length == 0">
        <tr>
          <td colspan="2">
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
              <p>Data Tidak Ditemukan</p>
              <!-- <p class="mt-2">
                Jika sudah ada transaksi Pastikan Koneksi Internet Berjalan
                Normal dan Silahkan coba lagi
              </p> -->
            </div>
          </td>
        </tr>
      </tbody>

      <tbody
        v-if="salesReport.length != 0"
        class="text-gray-800 text-sm font-light"
      >
        <tr
          v-for="item in salesReport"
          :key="item.key"
          class="border-b border-gray-200 hover:bg-gray-100 align-top"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <p>{{ item.store_item_name }}</p>
            <p class="text-gray-400">{{ item.variant }}</p>
          </td>
          <!-- <td class="py-3 px-6 text-left whitespace-nowrap">{{}}</td> -->
          <td class="py-3 px-6 text-right whitespace-nowrap">
            {{ item.sold }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SalesReport",
  props: {
    salesReport: Array,
  },
};
</script>
