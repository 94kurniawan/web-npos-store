<template>
  <div class="h-full p-3 col-span-9 overflow-y-auto">
    <!-- Table -->
    <div class="bg-white h-full overflow-y-auto pb-8">
      <table class="h-full min-w-max w-full table-auto">
        <thead class="sticky top-0 z-10">
          <tr class="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">
              item ({{ rawMaterials.length }})
            </th>
            <th class="py-3 px-6 text-left">SKU</th>
            <th class="py-3 px-6 text-left">Category</th>
            <th class="py-3 px-6 text-left">Warehouse ID</th>
            <th class="py-3 px-6 text-right">TOTAL STOK</th>
            <th class="py-3 px-6 text-left">UNIT</th>
          </tr>
        </thead>

        <tbody v-if="rawMaterials.length == 0">
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
                <p>Data Tidak Ditemukan</p>
                <p class="mt-2">
                  Pastikan Koneksi Internet Berjalan Normal dan Silahkan coba
                  lagi
                </p>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody
          v-if="rawMaterials.length != 0"
          class="text-gray-800 text-sm font-light"
        >
          <tr
            v-for="raw in rawMaterials"
            :key="raw.key"
            class="border-b border-gray-200 hover:bg-gray-100 align-top"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ raw.name }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ raw.sku }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ raw.category }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ raw.warehouse_id }}
            </td>
            <td class="py-3 px-6 text-right whitespace-nowrap">
              {{ raw.stock }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ raw.unit }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import ModalItemOptions from "@/views/components/ModalItemOptions.vue";
// import Cart from "@/views/components/Cart.vue";
// import * as numberFormat from "@/custom_package/number.js";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "RawMaterials",
  components: {},

  data() {
    return {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      rawMaterials: [
        // {
        //   id: null,
        //   warehouse_id: null,
        //   sku: null,
        //   name: "",
        //   stock: null,
        //   unit: "",
        // },
      ],
    };
  },

  computed: {},

  methods: {
    async fetchRawMaterials() {
      let headers = { Authorization: `Bearer ${this.token}` };
      const response = await axios.get(apiHost + "/api/store/ingredients", {
        headers,
        params: {
          store_id: this.user.info.store_id,
        },
      });
      this.rawMaterials = response.data.data;
    },
  },

  mounted() {
    this.fetchRawMaterials();
  },
};
</script>
