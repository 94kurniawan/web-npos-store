<template>
  <div id="listMenu" class="h-full bg-gray-100">
    <!-- user info -->
    <!-- <div class="h-1/6 bg-gray-100 text-gray-600 border-b-2">
      <div class="flex justify-end px-3 pt-4 pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p class="text-right px-3 capitalize underline">
        {{ userInfo.info.name }}
      </p>
    </div> -->
    <!-- store name -->
    <div
      class="
        h-1/4
        p-2
        border-t-4
        grid grid-cols-3
        gap-2
        content-center
        items-center
        text-gray-600
        overflow-y-auto
      "
    >
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <div class="col-span-2 uppercase text-sm">
        <p class="text-xs mb-2 underline">{{ userInfo.info.name }}</p>
        <p class="font-bold">
          {{ userInfo.info.store_name }}
        </p>
      </div>
    </div>
    <!-- list Menu -->
    <div
      id="listMenuItems"
      class="
        h-3/4
        grid grid-flow-row
        auto-rows-min
        gap-1
        px-4
        pt-1
        pb-20
        rounded-t-3xl
        bg-gray-100
        overflow-y-auto
      "
    >
      <router-link to="/home" class="py-4 flex items-center">
        <svg
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p class="ml-1">Point of Sale</p>
      </router-link>
      <router-link to="/sales-history" class="py-4 flex items-center">
        <svg
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="ml-1">Riwayat Penjualan</p>
      </router-link>
      <router-link to="/finance" class="py-4 flex items-center">
        <svg
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
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p class="ml-1">Kas Keluar</p>
      </router-link>
      <router-link to="/recap-cash" class="py-4 flex items-center">
        <svg
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
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="ml-1">Rekap Kas</p>
      </router-link>
      <router-link to="/raw-materials" class="py-4 flex items-center">
        <svg
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <p class="ml-1">Bahan Baku</p>
      </router-link>
      <router-link to="/transactions" class="py-4 flex items-center">
        <svg
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <p class="ml-1">Transaksi Stok</p>
      </router-link>
      <router-link to="/reports" class="py-4 flex items-center">
        <svg
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <p class="ml-1">Laporan</p>
      </router-link>
    </div>

    <!-- logout -->
    <button
      @click="logOut()"
      class="
        fixed
        flex
        items-center
        bottom-2
        left-4
        bg-gray-400
        text-gray-50
        rounded-xl
        shadow-lg
        px-2
        py-1
      "
    >
      <p class="mr-1">keluar</p>
      <svg
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
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  </div>
</template>

<style>
#listMenu a.router-link-exact-active {
  color: #447246;
  background-color: transparent;
}
</style>

<script>
import axios from "axios";
let apiHost = process.env.VUE_APP_BACKEND_HOST;

export default {
  name: "SideMenu",
  components: {},

  data() {
    return {
      userInfo: {
        info: {
          user_id: null,
          username: "",
          name: "",
          role: "",
          store_id: null,
          store_name: "",
        },
      },
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
  },

  methods: {
    async logOut() {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("receipt");
        this.$router.push("/");
        let headers = { Authorization: `Bearer ${this.userInfo.token}` };
        await axios.get(apiHost + "/api/logout", {
          headers,
        });
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>
