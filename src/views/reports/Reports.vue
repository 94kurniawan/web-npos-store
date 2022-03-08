<template>
  <div id="container" class="h-full relative bg-gray-200 grid grid-cols-12">
    <div id="leftCol" class="h-full p-3 col-span-4 bg-gray-100 overflow-y-auto">
      <div
        class="
          w-full
          px-2
          py-3
          items-center
          sticky
          -top-3
          bg-white
          font-medium
          text-center
        "
      >
        LAPORAN
      </div>

      <div class="grid grid-flow-row gap-1">
        <p class="p-3 bg-gray-100 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Laporan Penjualan
        </p>
      </div>
    </div>

    <sales-report :salesReport="report.items" />

    <!-- Menu (Absolute Template) -->
    <button
      @click="showMenu()"
      type="submit"
      class="absolute top-6 left-4 z-20"
    >
      <svg
        v-if="showSideMenu === false"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-if="showSideMenu === true"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div v-if="showSideMenu === true" class="absolute h-full w-full">
      <div
        id="sideMenuHome"
        @click="closeMenuWindow()"
        class="h-full bg-gray-500 bg-opacity-40 grid grid-cols-12"
      >
        <div class="h-full col-span-3 bg-gray-200 overflow-y-auto">
          <side-menu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideMenu from "@/views/components/SideMenu.vue";
import SalesReport from "@/views/reports/SalesReport.vue";
import moment from "moment";
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "Reports",
  components: {
    SideMenu,
    SalesReport,
  },

  data() {
    return {
      token: localStorage.getItem("token"),

      userInfo: JSON.parse(localStorage.getItem("user")),

      showSideMenu: false,

      report: {
        items: [
          {
            store_item_name: "",
            store_item_id: null,
            variant: "",
            sold: null,
            gross_sales: null,
            total_discount: null,
            net_sale: null,
            additional_cost: null,
            total_collected: null,
          },
        ],
      },
    };
  },

  methods: {
    showMenu() {
      if (this.showSideMenu === false) {
        this.showSideMenu = true;
      } else {
        this.showSideMenu = false;
      }
    },

    closeMenuWindow() {
      let win = document.getElementById("sideMenuHome");
      if (window.event.target == win) {
        this.showSideMenu = false;
      }
    },

    async fetchReport() {
      try {
        let headers = { Authorization: `Bearer ${this.token}` };
        const response = await axios.get(
          apiHost + "/api/store/fetch-sales-reports",
          {
            headers,
            params: {
              date_from: moment().format("YYYY-MM-DD"),
              date_to: moment().format("YYYY-MM-DD"),
              store_id: this.userInfo.info.store_id,
            },
          }
        );
        this.report = response.data.data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  mounted() {
    this.fetchReport();
  },
};
</script>
